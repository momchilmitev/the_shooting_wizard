// Select game sections
const gameStart = document.getElementById('game-start');
const gameArea = document.getElementById('game-area');
const gameScore = document.getElementById('game-score');
const gameOver = document.getElementById('game-over');
let keys = {};
let player = {
	x: 150,
	y: 100,
	width: 0,
	height: 0,
};
let game = {
	speed: 2,
	movingMultiplayer: 4,
};

// Listeners
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

// Adding click event on the start button
gameStart.addEventListener('click', startGame);

function startGame() {
	gameStart.classList.add('hide');
	showWizard();

	// Game loop
	window.requestAnimationFrame(gameAction);
}

function gameAction() {
	// Get the wizard
	const wizard = document.querySelector('.wizard');

	// Controllers for user input
	if (keys.ArrowUp && player.y > 0) {
		player.y -= game.speed * game.movingMultiplayer;
	}
	if (keys.ArrowDown && player.y + player.height < gameArea.offsetHeight) {
		player.y += game.speed * game.movingMultiplayer;
	}
	if (keys.ArrowLeft && player.x > 0) {
		player.x -= game.speed * game.movingMultiplayer;
	}
	if (keys.ArrowRight && player.x + player.width < gameArea.offsetWidth) {
		player.x += game.speed * game.movingMultiplayer;
	}

	wizard.style.top = player.y + 'px';
	wizard.style.left = player.x + 'px';

	window.requestAnimationFrame(gameAction);
}

function showWizard() {
	const wizard = document.createElement('div');
	wizard.classList.add('wizard');
	wizard.style.top = player.x + 'px';
	wizard.style.left = player.y + 'px';
	gameArea.appendChild(wizard);

	player.width = wizard.offsetWidth;
	player.height = wizard.offsetHeight;
}

function onKeyUp(e) {
	keys[e.code] = false;
}

function onKeyDown(e) {
	keys[e.code] = true;
}
