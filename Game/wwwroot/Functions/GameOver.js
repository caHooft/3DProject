function gameOver()
{
	var screenWidth = 0;
	var screenHeight = 0;
	var gameOverText = document.createElement('div');
	gameOverText.style.position = 'absolute';
	gameOverText.innerHTML = "Game Over! Your score is: " + score;
	screenHeight = screen.height;
	screenWidth = screen.width;
	gameOverText.style.width = 100;
	gameOverText.style.height = 100;
	gameOverText.style.top = screenHeight / 2 - 100 + 'px';
	gameOverText.style.left = screenWidth / 2 - 300 + 'px';
	gameOverText.style.fontSize = 50 + 'px'

	document.body.appendChild(gameOverText);
}
