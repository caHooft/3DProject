function createScene()
{
  hasCollided = false;
  score = 0;
  dinosInPath = [];
  modelPool = [];
  clock = new THREE.Clock();
  clock.start();
  playerRollingSpeed = (rollingSpeed * worldRadius / playerRadius) / 5;
  sphericalHelper = new THREE.Spherical();
  pathAngleValues = [1.52, 1.57, 1.62];
  sceneWidth = window.innerWidth;
  sceneHeight = window.innerHeight;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, sceneWidth / sceneHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(sceneWidth, sceneHeight);
  dom = document.getElementById('TutContainer');
  dom.appendChild(renderer.domElement);

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

  window.addEventListener('resize', onWindowResize, false);

  document.onkeydown = handleKeyDown;

  scoreText = document.createElement('div');
  scoreText.style.position = 'absolute';
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
