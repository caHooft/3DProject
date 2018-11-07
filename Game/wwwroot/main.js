const LoadStates = Object.freeze
	(
	{
		"NOT_LOADING": 1,
		"LOADING": 2,
		"LOADED": 3
	}
	);

var sceneWidth;
var sceneHeight;
var camera;
var scene;
var renderer;
var sun;
var exampleSocket;
var worldObjects = {};

var ground;
var planet;
var rollingSpeed = 0.008 / 2;
var worldRadius = 26;

var player;
var playerRollingSpeed;
var playerRadius = 0.2;
var playerBase = 1.8;
var bounceValue = 0.1;
var jumping;
var gravity = 0.005;

var sphericalHelper;
var pathAngleValues;

var leftLane = -1;
var rightLane = 1;
var middleLane = 0;
var currentLane;
var clock;

var releaseInterval = 0.5 * 2;
var lastReleaseTime = 0;

var hasCollided;
var particleGeometry;
var particleCount = 50;
var explosionPower = 1.06;
var particles;
var gameOverCalled = false;
var gameOverNode;

var scoreText;
var score;

var startGame = false;
var instructionNode;
var pauseNode;
var paused = false;

var themeMusic;
var crashSound;
var pauseSound;

function parseCommand(input = "")
{
	return JSON.parse(input);
}

window.onload = function ()
{
	themeMusic = new Audio("Puzzle-Dreams.mp3")
	crashSound = new Audio("43607__freqman__sandbag.wav");
	pauseSound = new Audio("Pause_Sound.mp3");

	if (typeof themeMusic.loop == 'boolean')
	{
		themeMusic.loop = true;
	}
	else
	{
		themeMusic.addEventListener('ended', function ()
		{
			this.currentTime = 0;
			this.play();
		}, false);
	}
	themeMusic.play();

	function init()
	{
		// set up the scene
		createScene(); // Runs from external file

		//call game loop
		update();
	}

	webSocket = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port + "/connect_client");
	webSocket.onmessage = function (event) { doWebThings(event) }
	// webSocket.onmessage = doWebThings(event)

	init();
	// animate();
}

Element.prototype.remove = function ()
{
	this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function ()
{
	for (var i = this.length - 1; i >= 0; i--)
	{
		if (this[i] && this[i].parentElement)
		{
			this[i].parentElement.removeChild(this[i]);
		}
	}
}
