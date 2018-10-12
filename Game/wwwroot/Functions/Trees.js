function createTreesPool()
{
	var maxTreesInPool = 10;
	var newTree;
	for (var i = 0; i < maxTreesInPool; i++)
	{
		newTree = createTree();
		treesPool.push(newTree);
	}
}

function addPathTree()
{
	var options = [0, 1, 2];
	var lane = Math.floor(Math.random() * 3);
	addTree(true, lane);
	options.splice(lane, 1);
	if (Math.random() > 0.5)
	{
		lane = Math.floor(Math.random() * 2);
		addTree(true, options[lane]);
	}
}

function addWorldTrees()
{
	var numTrees = 36;
	var gap = 6.28 / 36;
	for (var i = 0; i < numTrees; i++)
	{
		addTree(false, i * gap, true);
		addTree(false, i * gap, false);
	}
}

function addTree(inPath, row, isLeft)
{
	var newTree;
	if (inPath)
	{
		if (treesPool.length == 0) return;
		newTree = treesPool.pop();
		newTree.visible = true;
		//console.log("add tree");
		treesInPath.push(newTree);
		sphericalHelper.set(worldRadius - 0.3, pathAngleValues[row], -rollingGroundSphere.rotation.x + 4);
	} else
	{
		newTree = createTree();
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
	newTree.position.setFromSpherical(sphericalHelper);
	var rollingGroundVector = rollingGroundSphere.position.clone().normalize();
	var treeVector = newTree.position.clone().normalize();
	newTree.quaternion.setFromUnitVectors(treeVector, rollingGroundVector);
	newTree.rotation.x += (Math.random() * (2 * Math.PI / 10)) + -Math.PI / 10;

	rollingGroundSphere.add(newTree);
}

function createModel(index)
{
	var model;
	switch (index)
	{
		case 0:
			break;

		case 1:
			break;

		case 2:
			break;

		case 3:
			break;

		case 4:
			break;

		case 5:
			break;

		case 6:
			break;

		case 7:
			break;

		case 8:
			break;

		case 9:
			break;

		default:
			break;
	}
	return model;
}

function createTree()
{
	var sides = 8;
	var tiers = 6;
	var scalarMultiplier = (Math.random() * (0.25 - 0.1)) + 0.05;
	var midPointVector = new THREE.Vector3();
	var vertexVector = new THREE.Vector3();
	var treeGeometry = new THREE.ConeGeometry(0.5, 1, sides, tiers);
	var treeMaterial = new THREE.MeshStandardMaterial({ color: 0x33ff33, shading: THREE.FlatShading });
	var offset;
	midPointVector = treeGeometry.vertices[0].clone();
	var currentTier = 0;
	var vertexIndex;
	blowUpTree(treeGeometry.vertices, sides, 0, scalarMultiplier);
	tightenTree(treeGeometry.vertices, sides, 1);
	blowUpTree(treeGeometry.vertices, sides, 2, scalarMultiplier * 1.1, true);
	tightenTree(treeGeometry.vertices, sides, 3);
	blowUpTree(treeGeometry.vertices, sides, 4, scalarMultiplier * 1.2);
	tightenTree(treeGeometry.vertices, sides, 5);
	var treeTop = new THREE.Mesh(treeGeometry, treeMaterial);
	treeTop.castShadow = true;
	treeTop.receiveShadow = false;
	treeTop.position.y = 0.9;
	treeTop.rotation.y = (Math.random() * (Math.PI));
	var treeTrunkGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5);
	var trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x886633, shading: THREE.FlatShading });
	var treeTrunk = new THREE.Mesh(treeTrunkGeometry, trunkMaterial);
	treeTrunk.position.y = 0.25;
	var tree = new THREE.Object3D();
	tree.add(treeTrunk);
	tree.add(treeTop);
	return tree;

	// var tree = new THREE.Object3D();
	// var jeez = fuckTree();
	// tree.add(jeez);
	// tree.position.y = 0.25;
	// tree.rotation.y = (Math.random() * (Math.PI));
	// return tree;
}

function loadModel(pathMTL, mtlFile, pathOBJ, objFile)
{
	var mtlLoader = new THREE.MTLLoader();

	mtlLoader.setTexturePath(pathMTL);
	mtlLoader.setPath(patMTL);
	mtlLoader.load(mtlFile, function (materials)
	{
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath(pathOBJ);

		objLoader.load(objFile, function (object)
		{
			return object;
		}
		);
	}
	);
}

function blowUpTree(vertices, sides, currentTier, scalarMultiplier, odd)
{
	var vertexIndex;
	var vertexVector = new THREE.Vector3();
	var midPointVector = vertices[0].clone();
	var offset;
	for (var i = 0; i < sides; i++)
	{
		vertexIndex = (currentTier * sides) + 1;
		vertexVector = vertices[i + vertexIndex].clone();
		midPointVector.y = vertexVector.y;
		offset = vertexVector.sub(midPointVector);
		if (odd)
		{
			if (i % 2 === 0)
			{
				offset.normalize().multiplyScalar(scalarMultiplier / 6);
				vertices[i + vertexIndex].add(offset);
			} else
			{
				offset.normalize().multiplyScalar(scalarMultiplier);
				vertices[i + vertexIndex].add(offset);
				vertices[i + vertexIndex].y = vertices[i + vertexIndex + sides].y + 0.05;
			}
		} else
		{
			if (i % 2 !== 0)
			{
				offset.normalize().multiplyScalar(scalarMultiplier / 6);
				vertices[i + vertexIndex].add(offset);
			} else
			{
				offset.normalize().multiplyScalar(scalarMultiplier);
				vertices[i + vertexIndex].add(offset);
				vertices[i + vertexIndex].y = vertices[i + vertexIndex + sides].y + 0.05;
			}
		}
	}
}

function tightenTree(vertices, sides, currentTier)
{
	var vertexIndex;
	var vertexVector = new THREE.Vector3();
	var midPointVector = vertices[0].clone();
	var offset;
	for (var i = 0; i < sides; i++)
	{
		vertexIndex = (currentTier * sides) + 1;
		vertexVector = vertices[i + vertexIndex].clone();
		midPointVector.y = vertexVector.y;
		offset = vertexVector.sub(midPointVector);
		offset.normalize().multiplyScalar(0.06);
		vertices[i + vertexIndex].sub(offset);
	}
}

function doTreeLogic()
{
	var oneTree;
	var treePos = new THREE.Vector3();
	var treesToRemove = [];
	treesInPath.forEach(function (element, index)
	{
		oneTree = treesInPath[index];
		treePos.setFromMatrixPosition(oneTree.matrixWorld);
		if (treePos.z > 6 && oneTree.visible)
		{//gone out of our view zone
			treesToRemove.push(oneTree);
		} else
		{//check collision
			if (treePos.distanceTo(heroSphere.position) <= 0.6)
			{
				console.log("hit");
				hasCollided = true;
				explode();
				gameOver();
			}
		}
	});
	var fromWhere;
	treesToRemove.forEach(function (element, index)
	{
		oneTree = treesToRemove[index];
		fromWhere = treesInPath.indexOf(oneTree);
		treesInPath.splice(fromWhere, 1);
		treesPool.push(oneTree);
		oneTree.visible = false;
		console.log("remove tree");
	});
}
