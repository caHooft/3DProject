function doWebThings(event)
{
	var command = parseCommand(event.data);

	if (command.command = "update")
	{
		if (Object.keys(worldObjects).indexOf(command.parameters.guid) < 0)
		{
			if (command.parameters.type == "trike")
			{
				console.log(command);
				trike = new gTriceratops();

				var group = new THREE.Group();
				group.add(trike);

				scene.add(group);
				worldObjects[command.parameters.guid] = group;
			}
		}

		if (Object.keys(worldObjects).indexOf(command.parameters.guid) < 0)
		{
			if (command.parameters.type == "trex")
			{
				console.log(command);
				trex = new gTRex();

				var group = new THREE.Group();
				group.add(trex);

				scene.add(group);
				worldObjects[command.parameters.guid] = group;
			}
		}

		if (Object.keys(worldObjects).indexOf(command.parameters.guid) < 0)
		{
			if (command.parameters.type == "steg")
			{
				console.log(command);
				steg = new gStegosaurus();

				var group = new THREE.Group();
				group.add(steg);

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
	if (keyEvent.keyCode === 37)
	{//left
		if (currentLane == middleLane)
		{
			currentLane = leftLane;
		} else if (currentLane == rightLane)
		{
			currentLane = middleLane;
		} else
		{
			validMove = false;
		}
	} else if (keyEvent.keyCode === 39)
	{//right
		if (currentLane == middleLane)
		{
			currentLane = rightLane;
		} else if (currentLane == leftLane)
		{
			currentLane = middleLane;
		} else
		{
			validMove = false;
		}
	} else
	{
		if (keyEvent.keyCode === 38)
		{//up, jump
			bounceValue = 0.1;
			jumping = true;
		}
		validMove = false;
	}
	//heroSphere.position.x=currentLane;
	if (validMove)
	{
		jumping = true;
		bounceValue = 0.06;
	}
}