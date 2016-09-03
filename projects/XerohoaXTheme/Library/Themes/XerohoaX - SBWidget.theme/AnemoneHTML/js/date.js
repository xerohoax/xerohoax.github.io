var date = {
	refreshEvery: config.date.refreshEvery
};

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var ones = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
var tens = ["Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

date.handleDate = function() {
	var dateValue = null;

	var now = new Date();
	var day = days[now.getDay()];
	var month = months[now.getMonth()];
	var date = now.getDate();
	var year = now.getFullYear();

	if (day !== null && month !== null && date !== null && year !== null)
		dateValue = day + ',&nbsp;' + month + '&nbsp;' + date + ',&nbsp;' + year;
	if (dateValue !== null)
		$('#datePanel').html(dateValue);
	else
		$('#datePanel').html('Failed to retrieve date...');
};

date.init = function() {
	this.handleDate();

	this.intervalId = setInterval(function () {
		this.handleDate();
	}.bind(this), this.refreshEvery);
};