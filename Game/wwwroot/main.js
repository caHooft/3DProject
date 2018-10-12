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
var dom;
var sun;
var ground;
//var orbitControl;
var rollingGroundSphere;
var heroSphere;
var rollingSpeed = 0.008;
var heroRollingSpeed;
var worldRadius = 26;
var heroRadius = 0.2;
var sphericalHelper;
var pathAngleValues;
var heroBaseY = 1.8;
var bounceValue = 0.1;
var gravity = 0.005;
var leftLane = -1;
var rightLane = 1;
var middleLane = 0;
var currentLane;
var clock;
var jumping;
var treeReleaseInterval = 0.5;
var lastTreeReleaseTime = 0;
var treesInPath;
var treesPool;
var particleGeometry;
var particleCount = 20;
var explosionPower = 1.06;
var particles;
//var stats;
var scoreText;
var score;
var hasCollided;
var exampleSocket;
var worldObjects = {};
var startGame = false;
var gameOverCalled = false;
var instructionNode;
var gameOverNode;

var themeMusic;
var crashSound;

function parseCommand(input = "")
{
	return JSON.parse(input);
}

window.onload = function ()
{

	var camera, scene, renderer;
	var cameraControls;

	themeMusic = new Audio("Puzzle-Dreams.mp3")
	crashSound = new Audio("43607__freqman__sandbag.wav");

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

	var worldObjects = {};

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
