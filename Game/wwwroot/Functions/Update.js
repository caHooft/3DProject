function update()
{
	//Displays instructions until space is pressed
	if (!startGame)
	{
		Instructions();
	}
	else
	{
		//removes instructions
		if (instructionNode != null)
		{
			document.getElementById("instructionText").remove();
			instructionNode = null;
		}
		else
		{
			//stats.update();
			//animate
			rollingGroundSphere.rotation.x += rollingSpeed;
			heroSphere.rotation.x -= heroRollingSpeed;
			cubeSkybox.rotation.x = rollingGroundSphere.rotation.x;
			if (heroSphere.position.y <= heroBaseY)
			{
				jumping = false;
				bounceValue = (Math.random() * 0.04) + 0.005;
			}
			heroSphere.position.y += bounceValue;
			heroSphere.position.x = THREE.Math.lerp(heroSphere.position.x, currentLane, 2 * clock.getDelta());//clock.getElapsedTime());
			bounceValue -= gravity;
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

			if (gameOverCalled)
			{
				gameOver();
			}
		}
	}

	render();
	requestAnimationFrame(update);//request next update
}

function render()
{
	renderer.render(scene, camera);//draw
}

function Instructions()
{
	if (instructionNode == null)
	{
		var instructionText = document.createElement('div');
		instructionText.style.position = 'absolute';
		instructionText.innerHTML = "Up = Jump <br> Left / Right = Move <br> Press Space to Start";
		instructionText.style.top = sceneHeight / 2 - 100 + 'px';
		instructionText.style.left = sceneWidth / 2 - 200 + 'px';
		instructionText.style.fontSize = 50 + 'px'
		instructionText.setAttribute("id", "instructionText");
		document.body.appendChild(instructionText);
		instructionNode = document.getElementById("instructionText");
		console.log(instructionNode);
	}
	else
	{
		instructionNode.style.top = sceneHeight / 2 - instructionNode.style.height / 2 - 100 + 'px';
		instructionNode.style.left = sceneWidth / 2 - instructionNode.style.width / 2 - 200 + 'px';
	}
}
