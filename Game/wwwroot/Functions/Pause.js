//makes pause div
function pause()
{
	if (pauseNode == null)
	{
		var pauseText = document.createElement('div');
		pauseText.style.position = 'absolute';
		pauseText.innerHTML = "";
		pauseText.style.top = 0 + 'px';
		pauseText.style.left = 4 + 'px';
		pauseText.style.fontSize = 50 + 'px'
		pauseText.setAttribute("id", "pauseText");
		document.body.appendChild(pauseText);
		pauseNode = document.getElementById("pauseText");
	}
}
