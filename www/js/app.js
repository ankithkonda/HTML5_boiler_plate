global.$ = global.jQuery = require("jquery");
var graph = require("./graph.js");
var buttons = require("./buttons.js");


$(document).ready(function(){

	$("body").css({

		//"background-color":graph.color()
	});

	buttons.init();

	console.log("Hello I think this is just right");

});