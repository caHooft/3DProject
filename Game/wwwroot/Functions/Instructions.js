//makes instruction div and handles its position based on the screen size
function instructions()
{
	if (instructionNode == null)
	{
		var instructionText = document.createElement('div');
		instructionText.style.position = 'absolute';
		instructionText.innerHTML = "W: Jump <br> A D: Move <br> Space: Start <br> R: Restart <br> P: Pause";
		instructionText.style.top = sceneHeight / 2 - 250 + 'px';
		instructionText.style.left = sceneWidth / 2 - 130 + 'px';
		instructionText.style.fontSize = 50 + 'px'
		instructionText.align = "center";
		instructionText.setAttribute("id", "instructionText");
		document.body.appendChild(instructionText);
		instructionNode = document.getElementById("instructionText");
		console.log(instructionNode);
	}
	else
	{
		instructionNode.style.top = sceneHeight / 2 - instructionNode.style.height / 2 - 250 + 'px';
		instructionNode.style.left = sceneWidth / 2 - instructionNode.style.width / 2 - 130 + 'px';
	}
}
