function gameOver()
{
	if (gameOverNode == null)
	{
		var gameOverText = document.createElement('div');
		gameOverText.style.position = 'absolute';
		gameOverText.innerHTML = "Game Over! Your score is: " + score + "<br> Press R to restart";
		gameOverText.style.width = 100;
		gameOverText.style.height = 100;
		gameOverText.style.top = sceneHeight / 2 - gameOverText.style.height / 2 - 100 + 'px';
		gameOverText.style.left = sceneWidth / 2 - gameOverText.style.width / 2 - 300 + 'px';
		gameOverText.style.fontSize = 50 + 'px';
		gameOverText.align = "center";
		gameOverText.setAttribute("id", "gameOverText");
		document.body.appendChild(gameOverText);
		gameOverNode = document.getElementById("gameOverText");
		//console.log(gameOverNode);
	}

	else
	{
		gameOverNode.style.top = sceneHeight / 2 - gameOverNode.style.height / 2 - 100 + 'px';
		gameOverNode.style.left = sceneWidth / 2 - gameOverNode.style.width / 2 - 300 + 'px';
	}
}
