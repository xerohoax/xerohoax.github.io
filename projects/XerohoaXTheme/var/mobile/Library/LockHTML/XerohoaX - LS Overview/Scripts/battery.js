//Taken from Cataracs and modified by Taskinoz
//Battery
function refreshData(){					//Start Script
	$.ajaxSetup({ cache: false }); //Prevent Cache
	$.get("file:///var/mobile/Library/Stats/BatteryStats.txt", function(data){
		var split = data.split("\n");
		var level = split[0].split(": ")[1];
		$("#battery").html(level+'% '+'battery '+degs+" "+weth);
	});
	}
	setInterval(refreshData, 1000); //Fix by /u/SOMECoder
refreshData();