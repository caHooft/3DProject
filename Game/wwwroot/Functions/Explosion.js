function addExplosion()
{
	particleGeometry = new THREE.Geometry();
	for (var i = 0; i < particleCount; i++)
	{
		var vertex = new THREE.Vector3();
		particleGeometry.vertices.push(vertex);
	}
	var pMaterial = new THREE.ParticleBasicMaterial({
		color: 0xFFFFFF, size: 0.1
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
	particles.position.y = player.position.y;
	particles.position.z = player.position.z;
	particles.position.x = player.position.x;

	crashSound.play();

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
