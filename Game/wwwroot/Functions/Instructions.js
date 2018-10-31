//makes instruction div and handles its position based on the screen size
function instructions()
{
	if (instructionNode == null)
	{
		var instructionText = document.createElement('div');
		instructionText.style.position = 'absolute';
		instructionText.innerHTML = "↑/W: Jump <br> ←/A , →/D: Move <br> Space: Start <br> R: Restart <br> P: Pause";
		instructionText.style.top = '20%';
		instructionText.style.bottom = '0%';
		instructionText.style.left = '0%';
		instructionText.style.right = '0%';
		instructionText.style.margin = "auto";
		instructionText.style.fontSize = 50 + 'px';
		instructionText.align = "middle";
		instructionText.setAttribute("id", "instructionText");
		document.body.appendChild(instructionText);
		instructionNode = document.getElementById("instructionText");
	}
}
