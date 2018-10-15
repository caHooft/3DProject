//makes instruction div and handles its position based on the screen size
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
