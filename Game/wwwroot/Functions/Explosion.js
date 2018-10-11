function addExplosion()
{
	particleGeometry = new THREE.Geometry();
	for (var i = 0; i < particleCount; i++)
	{
		var vertex = new THREE.Vector3();
		particleGeometry.vertices.push(vertex);
	}
	var pMaterial = new THREE.ParticleBasicMaterial({
		color: 0xfffafa,
		size: 0.2
	});
	particles = new THREE.Points(particleGeometry, pMaterial);
	scene.add(particles);
	particles.visible = false;
}

function doExplosionLogic()
{
	if (!particles.visible) return;

	for (var i = 0; i < particleCount; i++)
	{
		particleGeometry.vertices[i].multiplyScalar(explosionPower);
	}

	if (explosionPower > 1.005)
	{
		explosionPower -= 0.001;
	}

	else
	{
		particles.visible = false;
	}
	particleGeometry.verticesNeedUpdate = true;
}

function explode()
{
	particles.position.y = 2;
	particles.position.z = 4.8;
	particles.position.x = heroSphere.position.x;

	for (var i = 0; i < particleCount; i++)
	{
		var vertex = new THREE.Vector3();
		vertex.x = -0.2 + Math.random() * 0.4;
		vertex.y = -0.2 + Math.random() * 0.4;
		vertex.z = -0.2 + Math.random() * 0.4;
		particleGeometry.vertices[i] = vertex;
	}
	explosionPower = 1.07;
	particles.visible = true;
}
