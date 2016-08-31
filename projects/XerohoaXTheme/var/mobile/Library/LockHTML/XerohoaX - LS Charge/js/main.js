var bezPoints,sizes,particles,batInSize,batIn,batBG,batStroke,batClip,batClipG,batPerc,batState,cachePerc,playing,started,canv,wWidth,wHeight,wCenter,y,wave,wavePos,waveHeight;
var pxdata;
function setup() {
    bezPoints = 4;
    sizes = {};
    canv = new Layer();
    particles = new Group();
    batIn = new Shape.Rectangle();
    batBG = new Shape.Rectangle();
    batClip = new Shape.Rectangle();
    wave = new Path();

    scaleWorld(world);
    buildBattery();
    updateBattery();
    for (var i = 0; i < particlesNum; i++) {
        newParticle();
    }
    makeWave();
    makeParticles();
    canv.opacity = canvasOpacity;
}

function scaleWorld(canvas) {
    sizes.view = [canvas.offsetWidth, canvas.offsetHeight];
    view.viewSize = new Size(sizes.view[0], sizes.view[1]);
    var context = canvas.getContext('2d'),
        devicePixelRatio = window.devicePixelRatio || 1,
        backingStoreRatio = context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1,
        ratio = devicePixelRatio / backingStoreRatio;
    if (devicePixelRatio !== backingStoreRatio) {
        var oldWidth = canvas.offsetWidth;
        var oldHeight = canvas.offsetHeight;

        canvas.width = oldWidth * ratio;
        canvas.height = oldHeight * ratio;

        canvas.style.width = oldWidth + 'px';
        canvas.style.height = oldHeight + 'px';
        context.scale(ratio, ratio);
    }
    sizes.particles = [batWidth, offsetBottom];
    sizes.battery = [batWidth, batHeight];
}

function buildBattery() {
    batBG = new Shape.Rectangle({
      center: new Point(
        view.center.x,
        sizes.view[1] - sizes.particles[1] - sizes.battery[1] / 2),
      size: [sizes.battery[0], sizes.battery[1]],
      fillColor: (backgroundEnabled) ? backgroundColor : 0
    });
    batBG.fillColor.alpha = (backgroundEnabled) ? backgroundOpacity : 0;

    if (roundedCorners) {
      batBG.radius = (strokeEnabled) ? strokeWidth : 8;
    }

    if(strokeEnabled){
      batStroke = new CompoundPath({
        children: [
          new Path.Rectangle({
            topLeft: batBG.bounds.topLeft - strokeWidth,
            bottomRight: batBG.bounds.bottomRight + strokeWidth,
            radius: (roundedCorners) ? strokeWidth*2 : 0
          }),
          batBG.toPath().clone()
        ],
        fillColor: strokeColor
      });
      batStroke.fillColor.alpha = strokeOpacity;
    }

    batIn = batBG.clone();
    batIn.radius = 0;
    batIn.size.height = batIn.size.height -10;
    batIn.fillColor = fillGreen;
    wave.fillColor = fillGreen;
    batIn = batIn;

    if (strokeEnabled || backgroundEnabled) {
        var batCap = new Shape.Rectangle({
          position: new Point(
            batBG.bounds.topCenter.x -10,
            (strokeEnabled) ? batStroke.bounds.topCenter.y - 3 : batBG.bounds.topCenter.y -3),
          size: [20,3],
          fillColor: (strokeEnabled) ? strokeColor : backgroundColor
          });
        batCap.fillColor.alpha = (strokeEnabled) ? strokeOpacity : backgroundOpacity;

    }

    batClip = batBG.clone();
    batClipG = new Group(batClip);
    batClipG.addChild(batIn);
    batClipG.clipped = true;
}

function updateBattery() {
  batIn.scaling.y = 1;
  batIn.position.y = batBG.position.y+5;
  batIn.scale(1,batPerc,batIn.bounds.bottomLeft);
  if (batPerc <= batteryRedPercent/100){
    batIn.fillColor = fillRed;
    wave.fillColor = fillRed;
  } else {
    batIn.fillColor = fillGreen;
    wave.fillColor = fillGreen;
  }
  wave.position.y = batIn.bounds.topLeft.y;
  y = batIn.bounds.topCenter.y;
  wavePos = new Point(batIn.bounds.center.x, y - 6);
  waveHeight = (y - wavePos.y) / 10;
  wCenter = new Point(batIn.bounds.center.x, y);
  wHeight = y - 8;
  wWidth = batIn.size.width;
}

function randX(container) {
    var x = -1 + Math.random() * 2;
    return (x * particleCurveWidth + container.center.x);
}

function mathMinMax(min, max, zto) {
    if (zto) {
        min = min * 100;
        max = max * 100;
        return ((Math.random() * (max - min + 1)) + min) / 100;
    }
    return (Math.random() * (max - min + 1)) + min;
}

function bezierBuild() {
    var y = sizes.view[1];
    var point = [
            [view.center.x, y],
            [randX(view), y - sizes.particles[1] * mathMinMax(0.20, 0.30, true)],
            [randX(view), y - sizes.particles[1] * mathMinMax(0.40, 0.60, true)],
            [randX(view), y - sizes.particles[1] * mathMinMax(0.70, 0.80, true)],
            [view.center.x, y - sizes.particles[1]]
        ],
        path = new Path({});

    for (var i = 0; i <= bezPoints; i++) {
        path.add(new Point(point[i]));
    }
    path.smooth();
    return path;
}

function newParticle() {
    var c = new Path.Circle(view.center.x, 0, mathMinMax(3, 5));
    c.fillColor = particleColor;
    c.opacity = mathMinMax(0.20, 0.8, true);
    c.p = bezierBuild();
    c.s = Math.ceil(mathMinMax(0, 2));
    particles.addChild(c);
}

function moveParticle(e, ofs) {
    var loc = e.p.getLocationAt(ofs % e.p.length);
    if (loc) {
      if (ofs >= e.p.length) {
        makeParticles(e);
      } else {
        e.position = loc.point;
      }
    }
}

var particFrame = function(event) {
    var offset = event.count * this.s;
    moveParticle(this, offset);
};

function makeParticles(element) {
    if (element) {
        element.p.remove();
        element.position = element.p.firstSegment.point;
        element.off('frame');
        element.p = bezierBuild();
        element.s = Math.ceil(mathMinMax(0, 2));
        element.on('frame', particFrame);
        return false;
    }
    for (var i = 0; i < particlesNum; i++) {
        particles.children[i].on('frame', particFrame);
    }
}

var waveFrame = function(event) {
    waveHeight += (wCenter.y - wavePos.y - waveHeight) / 10;
    for (var i = 2; i < wavePoints + 1; i++) {
        var sinSeed = event.count + (i + i % 100) * 100;
        var sinHeight = Math.sin(sinSeed / 100) * waveHeight;
        var yPos = Math.sin(sinSeed / 100) * sinHeight + wHeight;
        this.segments[i].point.y = yPos;
    }
    this.smooth();
};

function makeWave() {
  wave.segments = [];
  wave.add(batIn.bounds.topLeft.x, y + 4);
  wave.add(batIn.bounds.topLeft.x, y - 4);
  for (var i = 1; i < wavePoints; i++) {
      var point = new Point(batIn.bounds.topLeft.x + wWidth / wavePoints * i, wCenter.y);
      wave.add(point);
  }
  wave.add(batIn.bounds.topRight.x, y - 4);
  wave.add(batIn.bounds.topRight.x, y + 4);
  batClipG.addChild(wave);
  wave.on('frame', waveFrame);
}

this.editRun = function(){
  if(edit){
    batPerc = mathMinMax(0.3,0.9,true);
    if (!started){
      setup();
      started = true;
    }
    updateBattery();
  }
};

this.battery = function(result) {
  if(!!result === true) {
    var re = /: ?([\w]+)/g,
        st = result.split(re);
    if (debug){
      document.getElementById('debug').className='err';
      document.getElementById('debug').insertAdjacentHTML('beforeend', result + '</br>');      
    }
    batPerc = parseInt(st[1]) / 100;
    batState = st[3];
    if(!started) {
      cachePerc = batPerc;
      started = true;
    }
    if (batState == "Charging" || batState == "Fully Charged") {
      if (!playing) {
        cachePerc = batPerc;
        setup();
        playing = true;
      } else if (cachePerc != batPerc) {
        cachePerc = batPerc;
        updateBattery();
      }
    } else {
      if (playing) {
          project.activeLayer.removeChildren();
          view.draw();
          playing = false;
      }
    }
  } else if (debug){
    document.getElementById('debug').className='err';
    document.getElementById('debug').insertAdjacentHTML('beforeend', result + ' Could not read Battery.<br/> Make sure you have InfoStats installed in cydia<br/>');
    clearInterval(i);
  }
};