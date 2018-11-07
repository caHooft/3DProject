function gameOver()
{
	if (gameOverNode == null)
	{
		var gameOverText = document.createElement('div');
		gameOverText.style.position = 'absolute';
		gameOverText.innerHTML = "Game Over! Your score is: " + score + "<br> Press R to restart";
		gameOverText.style.top = '20%';
		gameOverText.style.bottom = '0%';
		gameOverText.style.left = '0%';
		gameOverText.style.right = '0%';
		gameOverText.style.margin = "auto";
		gameOverText.style.fontSize = 50 + 'px';
		gameOverText.align = "middle";
		gameOverText.setAttribute("id", "gameOverText");
		document.body.appendChild(gameOverText);
		gameOverNode = document.getElementById("gameOverText");

		player.position.z = 100000;
	}
}
