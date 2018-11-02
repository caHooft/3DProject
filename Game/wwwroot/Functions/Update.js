//handles all changes that need to happen next frame and calls for next frame
function update()
{
  //Displays instructions until space is pressed
  if (!startGame)
  {
    instructions();
    pause();
  }
  else if (paused)
  {
    pauseNode.innerHTML = "Paused";
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
      pauseNode.innerHTML = "";
      //stats.update();
      //animate
      planet.rotation.x += rollingSpeed;
      //player.rotation.x -= playerRollingSpeed;
      cubeSkybox.rotation.x = planet.rotation.x;
      if (player.position.y <= playerBase)
      {
        jumping = false;
        bounceValue = (Math.random() * 0.04) + 0.005;
      }
      player.position.y += bounceValue;
      player.position.x = THREE.Math.lerp(player.position.x, currentLane, 2 * clock.getDelta());//clock.getElapsedTime());
      bounceValue -= gravity;
      if (clock.getElapsedTime() > releaseInterval)
      {
        clock.start();
        addPath();
        if (!hasCollided)
        {
          score += 2 * releaseInterval;
          scoreText.innerHTML = score.toString();
        }
      }
      modelManagement();
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
