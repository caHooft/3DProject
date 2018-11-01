function doWebThings(event)
{
  var command = parseCommand(event.data);

  if (command.command = "update")
  {
    if (Object.keys(worldObjects).indexOf(command.parameters.guid) < 0)
    {
      if (command.parameters.type == "")
      {
        console.log(command);
        vari = new null();

        var group = new THREE.Group();
        group.add(vari);

        scene.add(group);
        worldObjects[command.parameters.guid] = group;
      }
    }

    var object = worldObjects[command.parameters.guid];

    object.position.x = command.parameters.x;
    object.position.y = command.parameters.y;
    object.position.z = command.parameters.z;

    object.rotation.x = command.parameters.rotationX;
    object.rotation.y = command.parameters.rotationY;
    object.rotation.z = command.parameters.rotationZ;
  }
}

function handleKeyDown(keyEvent)
{
  if (jumping) return;
  var validMove = true;

  if (keyEvent.keyCode === 32)
  {
    startGame = true;
  }
  if (keyEvent.keyCode == 82)
  {
    window.location.reload();
  }
  if (keyEvent.keyCode == 80)
  {
    pauseSound.pause();
    pauseSound.currentTime = 0;
    pauseSound.play();
    if (paused)
    {
      paused = false;
    }
    else
    {
      paused = true;
    }
  }
  if (startGame && !paused)
  {
    if (keyEvent.keyCode === 37 || keyEvent.keyCode === 65)
    {//left
      if (currentLane == middleLane)
      {
        currentLane = leftLane;
      }

      else if (currentLane == rightLane)
      {
        currentLane = middleLane;
      }

      else
      {
        validMove = false;
      }
    }

    else if (keyEvent.keyCode === 39 || keyEvent.keyCode === 68)
    {//right
      if (currentLane == middleLane)
      {
        currentLane = rightLane;
      }

      else if (currentLane == leftLane)
      {
        currentLane = middleLane;
      }

      else
      {
        validMove = false;
      }
    }

    else
    {
      if (keyEvent.keyCode === 38 || keyEvent.keyCode === 87)
      {//up, jump
        bounceValue = 0.1;
        jumping = true;
      }
      validMove = false;
    }
    //player.position.x=currentLane;
    if (validMove)
    {
      jumping = true;
      bounceValue = 0.06;
    }
  }
}
