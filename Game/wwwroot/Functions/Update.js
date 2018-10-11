function update()
{
	//stats.update();
	//animate
	rollingGroundSphere.rotation.x += rollingSpeed;
	heroSphere.rotation.x -= heroRollingSpeed;
	if (heroSphere.position.y <= heroBaseY)
	{
		jumping = false;
		bounceValue = (Math.random() * 0.04) + 0.005;
	}

	heroSphere.position.y += bounceValue;
	heroSphere.position.x = THREE.Math.lerp(heroSphere.position.x, currentLane, 2 * clock.getDelta());
	//clock.getElapsedTime());
	bounceValue -= gravity; 4

	if (clock.getElapsedTime() > treeReleaseInterval)
	{
		clock.start();
		addPathTree();

		if (!hasCollided)
		{
			score += 2 * treeReleaseInterval;
			scoreText.innerHTML = score.toString();
		}
	}

	doTreeLogic();
	doExplosionLogic();
	render();
	requestAnimationFrame(update);//request next update
}

function render()
{
	renderer.render(scene, camera);//draw
}
