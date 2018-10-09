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

    init();
    function init()
    {
      // set up the scene
      createScene();

      //call game loop
      update();
    }

    function createScene()
    {
      sceneWidth = window.innerWidth;
      sceneHeight = window.innerHeight;
      scene = new THREE.Scene();//the 3d scene
      //scene.fog = new THREE.Fog(0x00ff00, 50, 800);//enable fog
      camera = new THREE.PerspectiveCamera(60, sceneWidth / sceneHeight, 0.1, 1000);//perspective camera
      renderer = new THREE.WebGLRenderer({ alpha: true });//renderer with transparent backdrop
      renderer.shadowMap.enabled = true;//enable shadow
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setSize(sceneWidth, sceneHeight);
      dom = document.getElementById('TutContainer');
      dom.appendChild(renderer.domElement);

      //add items to scene
      var heroGeometry = new THREE.BoxGeometry(1, 1, 1);//cube
      var heroMaterial = new THREE.MeshStandardMaterial({ color: 0x883333 });
      hero = new THREE.Mesh(heroGeometry, heroMaterial);
      hero.castShadow = true;
      hero.receiveShadow = false;
      hero.position.y = 2;
      scene.add(hero);
      var planeGeometry = new THREE.PlaneGeometry(5, 5, 4, 4);
      var planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
      ground = new THREE.Mesh(planeGeometry, planeMaterial);
      ground.receiveShadow = true;
      ground.castShadow = false;
      ground.rotation.x = -Math.PI / 2;
      scene.add(ground);

      camera.position.z = 5;
      camera.position.y = 1;

      sun = new THREE.DirectionalLight(0xffffff, 0.8);
      sun.position.set(0, 4, 1);
      sun.castShadow = true;
      scene.add(sun);
      //Set up shadow properties for the sun light
      sun.shadow.mapSize.width = 256;
      sun.shadow.mapSize.height = 256;
      sun.shadow.camera.near = 0.5;
      sun.shadow.camera.far = 50;

      orbitControl = new THREE.OrbitControls(camera, renderer.domElement);//helper to rotate around in scene
      orbitControl.addEventListener('change', render);
      //orbitControl.enableDamping = true;
      //orbitControl.dampingFactor = 0.8;
      orbitControl.enableZoom = false;

      //var helper = new THREE.CameraHelper( sun.shadow.camera );
      //scene.add( helper );// enable to see the light cone

      window.addEventListener('resize', onWindowResize, false);//resize callback
    }

    function update()
    {
      //animate
      hero.rotation.x += 0.01;
      hero.rotation.y += 0.01;
      render();
      requestAnimationFrame(update);//request next update
    }
    function render()
    {
      renderer.render(scene, camera);//draw
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
