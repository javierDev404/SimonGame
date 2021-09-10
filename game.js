var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var level = 0;
var colorID = randomChosenColour;

$(document).ready(function() {

});
$(document).keydown(function() {
	restartGame();
	nextSequence();
	$("#level-title").text("Level " + level);
});

//gets player input
$(".btn").click(function(event) {
	var userChosenColour = event.target.id;
	userClickedPattern.push(userChosenColour);
	var keepGoing = checkSequance(userChosenColour);

	if (gamePattern.length == userClickedPattern.length && keepGoing == "true") {
		setTimeout(nextSequence, 1000);
	}
});

//random number Generator to get next colour
function checkSequance(userChosenColour) {
	var continueGame = "true";
	var answer;
	for (var i = 0; i < userClickedPattern.length; i++) {
		if (gamePattern[i] === userClickedPattern[i]) {
			playAudio(userChosenColour);
			flashAnimation(userChosenColour);
		} else {
			userChosenColour = "wrong";
			playAudio(userChosenColour);
			flashAnimation(userChosenColour);
			gameOver();
			return "false"
		}
	}
	continueGame = "true";
	return continueGame;
}

function gameOver() {
	$("body").addClass("game-over");
	$("#level-title").text("Game Over, Press any Key to Restart");
	setTimeout(function() {
		$("body").removeClass("game-over");

	}, 200);
}

function restartGame() {
	level = 0;
	$("#level-title").text("New Game Level" + level);
	clearGame()

}

function clearGame() {
	gamePattern = [];
	userClickedPattern = [];
}

function nextSequence() {
	//var for random number
	var randomNumber;
	//assing random number to var randomNumber
	level = level + 1;
	$("#level-title").text("Level " + level);
	randomNumber = Math.floor(Math.random() * 4);
	randomChosenColur = buttonColours[randomNumber];
	gamePattern.push(buttonColours[randomNumber]);
	flashAnimation(buttonColours[randomNumber]);
	playAudio(buttonColours[randomNumber]);
	userClickedPattern = [];
	return randomNumber;
}

function flashAnimation(colorID) {
	$("#" + colorID).fadeOut(50).fadeIn(50);

}

function playAudio(colorSound) {
	var colorAudio = new Audio("./sounds/" + colorSound + ".mp3");
	colorAudio.play();
}
