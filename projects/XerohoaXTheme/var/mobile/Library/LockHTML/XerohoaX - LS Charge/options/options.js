/**************************\
Enables/Disables rounded corners for the battery
Values = true/false
\**************************/
var roundedCorners = false;


/**************************\
Enables/Disables the stroke/outline. 
Values = true/false
\**************************/
var strokeEnabled = true;


/**************************\
Width of the stroke/outline
\**************************/
var strokeWidth = 2;


/**************************\
Enables/Disables the background.
Values = true/false
\**************************/
var backgroundEnabled = true;


/**************************\
Hex color of the stroke
\**************************/
var strokeColor = "#FFFFFF";


/**************************\
Hex color of the background
\**************************/
var backgroundColor = "#FFFFFF";


/**************************\
Hex color of the bubbles that flow into the battery
\**************************/
var particleColor = "#00FF01";


/**************************\
Hex color of the battery fill
\**************************/
var fillGreen = "#00FF01";


/**************************\
Hex color of the battery fill when the battery is low
\**************************/
var fillRed = "#FF3B30";


/**************************\
The percentage when the battery color changes to fillRed
Example: When set to 10, the color will change to red when the battery is below 10%
Setting this to 0 will make the battery always use fillGreen
\**************************/
var batteryRedPercent = 20;


/**************************\
The opacity of the whole widget, 
The values are 0.0-1.0
0.25 would make the opacity 25%, 0.01 = 10%, etc
\**************************/
var canvasOpacity = 1.0;


/**************************\
The opacity of the background, 
The values are 0.0-1.0
0.25 would make the opacity 25%, 0.01 = 10%, etc
\**************************/
var backgroundOpacity = 0.25;


/**************************\
The opacity of the background, 
The values are 0.0-1.0
0.25 would make the opacity 25%, 0.01 = 10%, etc
\**************************/
var strokeOpacity = 0.85;


/**************************\
The interval at which the widget checks for updates.
This may or may not affect battery life, honestly I don't know.
The value is in seconds.
\**************************/
var infoStatsInterval = 30;


/**************************\
Height of the battery
\**************************/
var batHeight = 150;

/**************************\
Width of the battery
\**************************/
var batWidth = 75;


/**************************\
The position of the BATTERY, from the bottom of screen.
The bubbles will always start at the bottom center of your screen.
This is just so you can position the battery where you want it.
\**************************/
var offsetBottom =  300;


/**************************\
The bubbles follow a randomly generated bezier curve
This sets the max width of that curve
\**************************/
var particleCurveWidth = 20;


/**************************\
Number of bubbles
increasing this by a lot might make the widget lag
\**************************/
var particlesNum = 5;


/**************************\
The battery wave is a bezier curve, this controls the number of segments in that curve.
If you have width set to a high number, you may want to increase it.
If you have width set to a low number, you may want to decrease it
\**************************/
var wavePoints = 2;



/***** DEBUG SECTION *****\
FOR DEBUGGING PURPOSES Debug mode: Will (hopefully) show some error messages on screen.
If you have any issues, set this to true and enable the widget, let me know what it says :)
Do not enable this together with edit mode, because that wont give any errors :p
Values = true/false
\**************************/
var debug = false;


/**************************\
Demo mode: Ignores the InfoStats file and plays a random battery %.
This is just to make sure the code itself works and that the animation is showing up properly.
Values = true/false
\**************************/
var edit = false;
