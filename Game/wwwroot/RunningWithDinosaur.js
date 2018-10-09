var sceneWidth;
var sceneHeight;
var camera;
var scene;
var renderer;
var dom;
var hero;
var sun;
var ground;
var orbitControl;

const LoadStates = Object.freeze
  (
  {
    "NOT_LOADING": 1,
    "LOADING": 2,
    "LOADED": 3
  }
  );

function parseCommand(input = "")
{
  return JSON.parse(input);
}

var exampleSocket;

window.onload = function ()
{

  var camera, scene, renderer;
  var cameraControls;

  var worldObjects = {};

  function init()
  {
    // camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    // cameraControls = new THREE.OrbitControls(camera);
    // camera.position.z = 15;
    // camera.position.y = 5;
    // camera.position.x = 15;
    // cameraControls.update();
    // scene = new THREE.Scene();

    // renderer = new THREE.WebGLRenderer({ antialias: true });
    // renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth, window.innerHeight + 5);
    //document.body.appendChild(renderer.domElement);

    // window.addEventListener('resize', onWindowResize, false);

    // var sphericalSkyboxGeometry = new THREE.SphereGeometry(200, 64, 64);
    // var sphericalSkyboxMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("Resources/Skybox/skybox_1.jpg"), side: THREE.DoubleSide });
    // var SphericalBox = new THREE.Mesh(sphericalSkyboxGeometry, sphericalSkyboxMaterial);
    // scene.add(SphericalBox);

    // var light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(15, 10, 15);
    // light.target.position.set(0, 0, 0);
    // light.castShadow = true;
    // light.shadowDarkness = 0.5;
    // light.shadowCameraNear = 2;
    // light.shadowCameraFar = 5;
    // light.shadowCameraLeft = -0.5;
    // light.shadowCameraRight = 0.5;
    // light.shadowCameraTop = 0.5;
    // light.shadowCameraBottom = -0.5;
    // scene.add(light);

    // set up the scene
    createScene();

    //call game loop
    update();

  }

  function createScene()
  {
    hasCollided = false;
    score = 0;
    treesInPath = [];
    treesPool = [];
    clock = new THREE.Clock();
    clock.start();
    //heroRollingSpeed = (rollingSpeed * worldRadius / heroRadius) / 5;
    sphericalHelper = new THREE.Spherical();
    pathAngleValues = [1.52, 1.57, 1.62];
    sceneWidth = window.innerWidth;
    sceneHeight = window.innerHeight;
    scene = new THREE.Scene();//the 3d scene
    scene.fog = new THREE.FogExp2(0xf0fff0, 0.14);

    camera = new THREE.PerspectiveCamera(60, sceneWidth / sceneHeight, 0.1, 1000);//perspective camera

    camera.position.z = 6.5;
    camera.position.y = 2.5;
    renderer = new THREE.WebGLRenderer({ alpha: true });//renderer with transparent backdrop
    renderer.setClearColor(0xfffafa, 1);
    renderer.shadowMap.enabled = true;//enable shadow
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(sceneWidth, sceneHeight);
    //dom = document.getElementById('TutContainer');
    document.appendChild(renderer.domElement);
    //stats = new Stats();
    //dom.appendChild(stats.dom);
    // createTreesPool();
    // addWorld();
    // addHero();
    // addLight();
    // addExplosion();

    /*orbitControl = new THREE.OrbitControls( camera, renderer.domElement );//helper to rotate around in scene
    orbitControl.addEventListener( 'change', render );
    orbitControl.noKeys = true;
    orbitControl.noPan = true;
    orbitControl.enableZoom = false;
    orbitControl.minPolarAngle = 1.1;
    orbitControl.maxPolarAngle = 1.1;
    orbitControl.minAzimuthAngle = -0.2;
    orbitControl.maxAzimuthAngle = 0.2;
    */
    window.addEventListener('resize', onWindowResize, false);//resize callback

    document.onkeydown = handleKeyDown;

    scoreText = document.createElement('div');
    scoreText.style.position = 'absolute';
    //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
    scoreText.style.width = 100;
    scoreText.style.height = 100;
    //scoreText.style.backgroundColor = "blue";
    scoreText.innerHTML = "0";
    scoreText.style.top = 50 + 'px';
    scoreText.style.left = 10 + 'px';
    document.body.appendChild(scoreText);

    var infoText = document.createElement('div');
    infoText.style.position = 'absolute';
    infoText.style.width = 100;
    infoText.style.height = 100;
    infoText.style.backgroundColor = "yellow";
    infoText.innerHTML = "UP - Jump, Left/Right - Move";
    infoText.style.top = 10 + 'px';
    infoText.style.left = 10 + 'px';
    document.body.appendChild(infoText);

    window.addEventListener('resize', onWindowResize, false);//resize callback
  }

  function onWindowResize()
  {
    //resize & align
    sceneHeight = window.innerHeight;
    sceneWidth = window.innerWidth;
    renderer.setSize(sceneWidth, sceneHeight);
    camera.aspect = sceneWidth / sceneHeight;
    camera.updateProjectionMatrix();
  }

  // function animate()
  // {
  //   requestAnimationFrame(animate);
  //   cameraControls.update();
  //   renderer.render(scene, camera);
  // }

  exampleSocket = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port + "/connect_client");
  exampleSocket.onmessage = function (event)
  {
    var command = parseCommand(event.data);

    if (command.command = "update")
    {
      if (Object.keys(worldObjects).indexOf(command.parameters.guid) < 0)
      {
        if (command.parameters.type == "")
        {
          console.log(command);

          var group = new THREE.Group();
          group.add(robot);

          scene.add(group);
          worldObjects[command.parameters.guid] = group;
        }
      }

      var object = worldObjects[command.parameters.guid];

      // object.position.x = command.parameters.x;
      // object.position.y = command.parameters.y;
      // object.position.z = command.parameters.z;

      // object.rotation.x = command.parameters.rotationX;
      // object.rotation.y = command.parameters.rotationY;
      // object.rotation.z = command.parameters.rotationZ;
    }
  }

  init();
  // animate();
}
