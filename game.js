var timer = true;
var count = 0;
var text = "";
var user;
var score = 0;
var keys;
var d;

$(document).ready(function () {
	var testArray = ["lackey", "test2", "asldg", "426", "shdfk"];
	var testArray2 = [33, 32, 30, 30, 29];
	Scoreboard(testArray, testArray2);
	startGame();
});

var clearZone = function(className) {
	$("." + className + "").empty();
}

var startGame = function() {
	clearZone("play_zone");
	$(".play_zone").append($("<div class='submit_name'><form action=''>Username: <input class='uk-input' type='text' autocorrect='off' name='username' id='user'><input class='uk-button' type='button' value='Start' onclick='getUser(), gameLoop();'></form></div>"));
	count = 0;
	score = 0;
	myVar();
}

//Need to figure out submit and check
var gameLoop = function() {
	clearZone("play_zone");
	$(".stats").empty();
	$(".stats").append($("<div class='score_board'>Score = " + score + " &nbsp &nbsp &nbsp &nbsp " + user.value + " &nbsp &nbsp &nbsp &nbsp Time = <span id='time'>" + timer + "</span></div>"));

	count ++;

	console.log(d);

	var array = [];

	var number = Math.floor((Math.random() * 36) + 1);

	$.ajax({
		url: 'http://localhost:8888/api.php',
		data: {action: 'read', choice: '0', num: number.toString()},
		dataType: "json",
		type: 'get',
		success: function(data) {
			
			array[0] = data.clue[0].src;
			array[1] = data.clue[0].alt;
			array[2] = data.clue[0].keyword;
			
		}
	});

	if(d > 2){
	setTimeout(
	  function() 
	  {
		var thisClue = new clue(array);
		console.log(thisClue.getSrc());
		keys = thisClue.getKeywords().toString();
		//console.log(keys);

		$(".play_zone").append($("<img src='images/" + thisClue.getSrc() + "' alt='" + thisClue.getAlt() + "'>"));
		$(".play_zone").append($("<div class='submit_guess'><form style='padding-top: 30px;' action=''><input class='uk-input' type='text' autocorrect='off' name='guess' id='text'><input class='uk-button' type='button' value='Submit' onclick='captureText();'></form></div>"));
		}, 500);
	}
	else{
	setTimeout(
	  function() 
	  {
		var thisClue = new clue(array);
		keys = thisClue.getKeywords().toString();
		//console.log(keys);

		$(".play_zone").append($("<img style='margin: auto; dsisplay: block;' src='images/" + thisClue.getSrc() + "' alt='" + thisClue.getAlt() + "'>"));
		$(".play_zone").append($("<div class='submit_guess'><form style='padding-top: 30px;' action=''><input class='uk-input' type='text'  autocorrect='off' name='guess' id='text'><input class='uk-button' type='button' value='Submit' onclick='gameEnd();'></form></div>"));
		}, 500);
	}

}

var gameEnd = function(keywords) {
	var keywordArray = keys.split('-');
	
	text = document.getElementById("text");
	
	// console.log(text.value);
	
	var temp = text.value.toLowerCase();
	
	// console.log(temp);
	
	var included = false;
	
	for (var i = 0; i < keywordArray.length; i++) {
		if(temp.indexOf(keywordArray[i]) != -1){
			included = true;
		}
	};
	
	if(included){
		score ++;
		alert("Correct!");
	} else{
		alert("Incorrect");
	}
    
	console.log(score);
	clearZone("play_zone");
	$(".stats").empty();
	$(".stats").append($("<div class='score_board'>Score = " + score + " &nbsp &nbsp &nbsp &nbsp " + user.value + " &nbsp &nbsp &nbsp &nbsp Time = " + timer + " </div>"));

	clearZone("play_zone");
	$(".play_zone").append($("<div style='text-align:right; padding-right:100px; margin-top:5%;'class='final_score'>You got " + score + " point(s)!</div>"));
	$(".play_zone").append($("<div class='play_again uk-position-center'><input class='uk-button' type='button' value='Play again?' onclick='startGame();'></div>"));

}

var clue = function(clueArray){
	var source = clueArray[0];
	var alternate = clueArray[1];
	var keywords = clueArray[2];

	this.getSrc = function(){
		return source;
	}

	this.getAlt = function(){
		return alternate;
	}

	this.getKeywords = function(){
		return keywords;
	}
}

var getUser = function(){
	user = document.getElementById("user");
	console.log(user.value);
	d = 60;
/*
	//NEW

		$.ajax({
		url: 'http://localhost:8888/api.php',
		data: {action: 'create', choice: '0', username:user.value},
		dataType: "json",
		type: 'post'
	});

	//END NEW
	*/
}

var captureText = function(){
	
	var keywordArray = keys.split('-');
	
	text = document.getElementById("text");
	
	// console.log(text.value);
	
	var temp = text.value.toLowerCase();
	
	// console.log(temp);
	
	var included = false;
	
	for (var i = 0; i < keywordArray.length; i++) {
		if(temp.indexOf(keywordArray[i]) != -1){
			included = true;
		}
	};
	
	if(included){
		score ++;
	alert("Correct!");
	} else{
		alert("Incorrect");
	}
	
	gameLoop();
}

var myVar = setInterval(function(){
	myTimer()
}, 1000);
d = 60;

function myTimer() {
	document.getElementById('time').innerHTML = millisToMinutesAndSeconds(d--);
}

function millisToMinutesAndSeconds(millis) {
  if(millis < 0){
  	return "0:00";
  }
  var minutes = Math.floor(millis / 60);
  var seconds = ((millis % 60)).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

var Scoreboard = function(array, array2){
	clearZone("high_score");
	$(".high_score").append($("<h2>High Scores</h2>"));
	$(".high_score").append($("<ol></ol>"));
	for (var i = 0; i < 5; i++) {
		$("ol").append($("<li>" + array[i] + " &nbsp &nbsp " + array2[i] + "</li>"));
	};
}