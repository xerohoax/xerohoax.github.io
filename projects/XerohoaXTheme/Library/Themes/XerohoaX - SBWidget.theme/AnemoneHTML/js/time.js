var time = {
	refreshEvery: config.time.refreshEvery,
	format24: config.time.format24,
};

time.handleTime = function() {
	var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes();
	var t = "AM";
	var result = "";

	if (!this.format24) {
		if (h >= 12) {
			h -= 12;
			t = "PM";
		} else {
			if (h === 0) {
				h = 12;
			}
		}
	}

	var hour = this.convertNumToName(h);
	var mins = this.convertNumToName(m);

	if (m < 10) {
		result = hour + " O'";
		if (m === 0) {
			result += "Clock";
		} else {
			result += mins;
		}
	} else {
		result = hour + " " + mins;
	}

	if (!this.format24) {
		result += " " + t;
	}

	$('#timePanel').html(result);
};

time.convertNumToName = function(num) {
	var ten, one, result;
	if (num < ones.length) {
		result = ones[num];
	} else {
		ten = Math.floor(num / 10);
		one = num % 10;
		if (ten <= 9) {
			result = tens[ten - 2];
			if (one > 0) {
				result += " " + ones[one];
			}
		} else {
			result = "unknown";
		}
	}
	return result;
};

time.init = function() {
	this.handleTime();

	this.intervalId = setInterval(function () {
		this.handleTime();
	}.bind(this), this.refreshEvery);
};