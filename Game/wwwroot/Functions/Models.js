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
	arr = shuffle(arr);
	console.log(arr);
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
			model = new gStegosaurus
			break;

		case 8:
			model = new gTRex;
			break;

		case 9:
			model = new gTriceratops;
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
	if (Math.random() > 0.5)
	{
		lane = Math.floor(Math.random() * 2);
		addModel(true, lanes[lane]);
	}
}

//calls for the addModel function for all models
function addWorldModels()
{
	var numModels = 36;
	var gap = 6.28 / 36;
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
		newModel = modelPool.pop();
		newModel.visible = true;
		console.log("add model");
		dinosInPath.push(newModel);
		sphericalHelper.set(worldRadius - 0.3, pathAngleValues[row], -rollingGroundSphere.rotation.x + 4);
	}
	else  
	{
		newModel = createModel(0);
		var forestAreaAngle = 0;//[1.52,1.57,1.62];
		if (isLeft)
		{
			forestAreaAngle = 1.68 + Math.random() * 0.1;
		}
		else
		{
			forestAreaAngle = 1.46 - Math.random() * 0.1;
		}
		sphericalHelper.set(worldRadius - 0.3, forestAreaAngle, row);
	}

	newModel.position.setFromSpherical(sphericalHelper);
	var rollingGroundVector = rollingGroundSphere.position.clone().normalize();
	var collisionVector = newModel.position.clone().normalize();
	newModel.quaternion.setFromUnitVectors(collisionVector, rollingGroundVector);
	newModel.rotation.x += (Math.random() * (2 * Math.PI / 10)) + -Math.PI / 10;
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
				console.log("hit");
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
		console.log("remove model");
	});
}