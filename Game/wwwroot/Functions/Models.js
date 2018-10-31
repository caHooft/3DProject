//Randomizes all elements of an array
//returns array
function shuffle(array)
{
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex)
  {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//creates an array of all models for the game to pull from
function createModelPool()
{
  var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var ids = [];
  arr = shuffle(arr);
  var newModel;
  for (var i = 0; i < arr.length; i++)
  {
    newModel = createModel(arr[i]);
    modelPool.push(newModel);
  }
}

//returns model given an index from 0/9
function createModel(index)
{
  switch (index)
  {
    case 0:
      model = new gAllosaurus;
      break;

    case 1:
      model = new gAnkylosaurus;
      break;

    case 2:
      model = new gBrachiosaurus;
      break;

    case 3:
      model = new gDilophosaurus;
      break;

    case 4:
      model = new gGallimimus;
      break;

    case 5:
      model = new gParasaurolophus;
      break;

    case 6:
      model = new gSpinosaurus;
      break;

    case 7:
      model = new gStegosaurus;
      break;

    case 8:
      model = new gTRex;
      break;

    case 9:
      model = new gTriceratops;
      break;

    case 10:
      // var r = Math.random();
      // if (r <= 0.25)
      // {
      //   model = new gTree;
      // }
      // else if (r > 0.25 && r <= 0.5)
      // {
      //   model = new gTreeBirch;
      // }
      // else if (r > 0.5 && r <= 0.75)
      // {
      //   model = new gTreeNeedle;
      // }
      // else if (r > 0.75)
      // {
      //   model = new gTreeOak;
      // }
      // model = new gTreeNeedle;
      break;

    default:
      break;
  }
  return model;
}

//determines which lanes will have an obstacle
//0.5 chance for obstacles in 2 lanes in one segment
function addPath()
{
  var lanes = [0, 1, 2];
  var lane = Math.floor(Math.random() * 3);
  addModel(true, lane);
  lanes.splice(lane, 1);
  // if (Math.random() > 0.5)
  // {
  //   lane = Math.floor(Math.random() * 2);
  //   addModel(true, lanes[lane]);
  // }
}

//calls for the addModel function for all models
function addWorldModels()
{
  var numModels = 72;
  var gap = 6.28 / 16;
  for (var i = 0; i < numModels; i++)
  {
    addModel(false, i * gap, true);
    addModel(false, i * gap, false);
  }
}

//adds a model to the rollingGroundSphere using a sphericalhelper to find the edge of the sphere
function addModel(inPath, row, isLeft)
{
  var newModel;

  if (inPath)
  {
    if (modelPool.length == 0) return;
    newModel = modelPool.shift();
    var r = Math.floor(Math.random() * 10);
    modelPool.push(createModel(r));
    newModel.visible = true;
    //console.log("add model");
    dinosInPath.push(newModel);
    sphericalHelper.set(worldRadius - 0.3, pathAngleValues[row], -rollingGroundSphere.rotation.x + 4);
  }
  else  
  {
    //pakt de tree models
    newModel = createModel(10);
    var forestAreaAngle = 0;//[1.52,1.57,1.62];
    if (isLeft)
    {
      //natuurlijke buiging aan de boom meegeven
      forestAreaAngle = 1.68;
    }
    else
    {
      //natuurlijke buiging aan de boom meegeven
      forestAreaAngle = 1.46;
    }
    sphericalHelper.set(worldRadius - 0.3, forestAreaAngle, row);
  }

  switch (newModel.name)
  {
    case "gAllosaurus":
      console.log("gAllosaurus");
      break;

    case "gAnkylosaurus":
      console.log("gAnkylosaurus");
      break;

    case "gBrachiosaurus":
      console.log("gBrachiosaurus");
      break;

    case "gDilophosaurus":
      console.log("gDilophosaurus");
      break;

    case "gGallimimus":
      console.log("gGallimimus");
      break;

    case "gParasaurolophus":
      console.log("gParasaurolophus");
      break;

    case "gSpinosaurus":
      console.log("gSpinosaurus");
      break;

    case "gStegosaurus":
      console.log("gStegosaurus");
      break;

    case "gTRex":
      console.log("gTRex");
      break;

    case "gTriceratops":
      console.log("gTriceratops");
      break;

    default:
      //console.log(newModel.name);
      break;
  }

  newModel.position.setFromSpherical(sphericalHelper);
  var rollingGroundVector = rollingGroundSphere.position.clone().normalize();
  var collisionVector = newModel.position.clone().normalize();
  newModel.quaternion.setFromUnitVectors(collisionVector, rollingGroundVector);
  newModel.rotation.y += (Math.random() * (2 * Math.PI / 25)) + -Math.PI / 25;
  //newModel.rotation.y = 0;
  rollingGroundSphere.add(newModel);
}

//handles the collision and collision effects
function modelManagement()
{
  var obstacle;
  var modelPos = new THREE.Vector3();
  var modelsToRemove = [];
  dinosInPath.forEach(function (element, index)
  {
    obstacle = dinosInPath[index];
    modelPos.setFromMatrixPosition(obstacle.matrixWorld);
    if (modelPos.z > 6 && obstacle.visible)
    {//gone out of our view zone
      modelsToRemove.push(obstacle);
    } else
    {//check collision
      if (modelPos.distanceTo(heroSphere.position) <= 0.6)
      {
        //console.log("hit");
        hasCollided = true;
        explode();
        gameOver();
      }
    }
  });
  var fromWhere;
  modelsToRemove.forEach(function (element, index)
  {
    obstacle = modelsToRemove[index];
    fromWhere = dinosInPath.indexOf(obstacle);
    dinosInPath.splice(fromWhere, 1);
    modelPool.push(obstacle);
    obstacle.visible = false;
    //console.log("remove model");
  });
}
