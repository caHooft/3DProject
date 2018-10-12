function addHero()
{
	jumping = false;

	var sphereGeometry = new THREE.DodecahedronGeometry(heroRadius, 1);
	var sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xe5f2f2, shading: THREE.FlatShading })
	heroSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

	// heroSphere = new gTRex();

	heroSphere.rotation.y = (180 * Math.PI / 180);
	heroSphere.receiveShadow = true;
	heroSphere.castShadow = true;
	scene.add(heroSphere);
	heroSphere.position.y = heroBaseY;
	heroSphere.position.z = 4.8;
	currentLane = middleLane;
	heroSphere.position.x = currentLane;
}

function addWorld()
{
	var sides = 40;
	var tiers = 40;
	var sphereGeometry = new THREE.SphereGeometry(worldRadius, sides, tiers);
	var sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xfffafa, shading: THREE.FlatShading })

	var vertexIndex;
	var vertexVector = new THREE.Vector3();
	var nextVertexVector = new THREE.Vector3();
	var firstVertexVector = new THREE.Vector3();
	var offset = new THREE.Vector3();
	var currentTier = 1;
	var lerpValue = 0.5;
	var heightValue;
	var maxHeight = 0.07;

	for (var j = 1; j < tiers - 2; j++)
	{
		currentTier = j;
		for (var i = 0; i < sides; i++)
		{
			vertexIndex = (currentTier * sides) + 1;
			vertexVector = sphereGeometry.vertices[i + vertexIndex].clone();
			if (j % 2 !== 0)
			{
				if (i == 0)
				{
					firstVertexVector = vertexVector.clone();
				}
				nextVertexVector = sphereGeometry.vertices[i + vertexIndex + 1].clone();
				if (i == sides - 1)
				{
					nextVertexVector = firstVertexVector;
				}
				lerpValue = (Math.random() * (0.75 - 0.25)) + 0.25;
				vertexVector.lerp(nextVertexVector, lerpValue);
			}
			heightValue = (Math.random() * maxHeight) - (maxHeight / 2);
			offset = vertexVector.clone().normalize().multiplyScalar(heightValue);
			sphereGeometry.vertices[i + vertexIndex] = (vertexVector.add(offset));
		}
	}
	rollingGroundSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	rollingGroundSphere.receiveShadow = true;
	rollingGroundSphere.castShadow = false;
	rollingGroundSphere.rotation.z = -Math.PI / 2;
	scene.add(rollingGroundSphere);
	rollingGroundSphere.position.y = -24;
	rollingGroundSphere.position.z = 2;
	addWorldModels();
}

function addLight()
{
	var hemisphereLight = new THREE.HemisphereLight(0xfffafa, 0x000000, .9)
	scene.add(hemisphereLight);
	sun = new THREE.DirectionalLight(0xcdc1c5, 0.9);
	sun.position.set(12, 6, -7);
	sun.castShadow = true;
	scene.add(sun);
	//Set up shadow properties for the sun light
	sun.shadow.mapSize.width = 256;
	sun.shadow.mapSize.height = 256;
	sun.shadow.camera.near = 0.5;
	sun.shadow.camera.far = 50;
}
