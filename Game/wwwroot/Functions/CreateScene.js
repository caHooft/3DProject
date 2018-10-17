function createScene()
{
  hasCollided = false;
  score = 0;
  dinosInPath = [];
  modelPool = [];
  clock = new THREE.Clock();
  clock.start();
  heroRollingSpeed = (rollingSpeed * worldRadius / heroRadius) / 5;
  sphericalHelper = new THREE.Spherical();
  pathAngleValues = [1.52, 1.57, 1.62];
  sceneWidth = window.innerWidth;
  sceneHeight = window.innerHeight;
  scene = new THREE.Scene();//the 3d scene
  // scene.fog = new THREE.FogExp2(0xf0fff0, 0.14);
  camera = new THREE.PerspectiveCamera(60, sceneWidth / sceneHeight, 0.1, 1000);//perspective camera
  renderer = new THREE.WebGLRenderer({ alpha: true });//renderer with transparent backdrop
  // renderer.setClearColor(0xfffafa, 1);
  renderer.shadowMap.enabled = true;//enable shadow
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(sceneWidth, sceneHeight);
  dom = document.getElementById('TutContainer');
  dom.appendChild(renderer.domElement);
  //stats = new Stats();
  //dom.appendChild(stats.dom);

  var cubeSkyboxGeometry = new THREE.BoxGeometry(900, 900, 900);
  var cubeSkyboxMaterials =
    [
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("Resources/Skybox/Clouds/Left.jpg"), side: THREE.DoubleSide }), //left
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("Resources/Skybox/Clouds/Right.jpg"), side: THREE.DoubleSide }), //right
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("Resources/Skybox/Clouds/Up.jpg"), side: THREE.DoubleSide }), //up
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("Resources/Skybox/Clouds/Down.jpg"), side: THREE.DoubleSide }), //down
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("Resources/Skybox/Clouds/Front.jpg"), side: THREE.DoubleSide }), //front
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("Resources/Skybox/Clouds/Back.jpg"), side: THREE.DoubleSide }) //back
    ];
  var cubeSkyboxMaterial = new THREE.MeshFaceMaterial(cubeSkyboxMaterials);
  cubeSkybox = new THREE.Mesh(cubeSkyboxGeometry, cubeSkyboxMaterial);
  scene.add(cubeSkybox);

  createModelPool();
  addWorld();
  addHero();
  addLight();
  addExplosion();

  camera.position.z = 6.5;
  camera.position.y = 2.5;

  // orbitControl = new THREE.OrbitControls(camera, renderer.domElement);//helper to rotate around in scene
  // orbitControl.addEventListener('change', render);
  // orbitControl.noKeys = true;
  // orbitControl.noPan = true;
  // orbitControl.enableZoom = false;
  // orbitControl.minPolarAngle = 1.1;
  // orbitControl.maxPolarAngle = 1.1;
  // orbitControl.minAzimuthAngle = -0.2;
  // orbitControl.maxAzimuthAngle = 0.2;

  window.addEventListener('resize', onWindowResize, false);//resize callback

  document.onkeydown = handleKeyDown;

  scoreText = document.createElement('div');
  scoreText.style.position = 'absolute';
  //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
  scoreText.style.width = 100;
  scoreText.style.height = 100;
  scoreText.innerHTML = "0";
  scoreText.style.top = 50 + 'px';
  scoreText.style.left = 10 + 'px';
  document.body.appendChild(scoreText);
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
