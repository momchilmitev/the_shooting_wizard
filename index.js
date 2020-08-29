// Select game sections
const gameStart = document.getElementById('game-start');
const gameArea = document.getElementById('game-area');
const gameScore = document.getElementById('game-score');
const gamePoints = gameScore.querySelector('.points');
const gameOver = document.getElementById('game-over');

// Game state variables
let keys = {};
let player = {
	x: 150,
	y: 100,
	width: 0,
	height: 0,
	lastTimeFiredBall: 0,
};
let game = {
	speed: 2,
	movingMultiplayer: 4,
	fireBallMultiplayer: 5,
	fireInterval: 150,
	cloudSpawnInterval: 3000,
	bugSpawnInterval: 1000,
};
let scene = {
	score: 0,
	lastCloudSpawn: 0,
	lastBugSpawn: 0,
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

function gameAction(timestamp) {
	// Get the wizard
	const wizard = document.querySelector('.wizard');

	// Add clouds
	showCloud(timestamp);

	// Add bugs
	showBug(timestamp);

	// Increment points
	scene.score++;

	// Display points
	gamePoints.textContent = scene.score;

	// Gravitation
	let isInAir = player.y + player.height <= gameArea.offsetHeight;

	if (isInAir) {
		player.y += game.speed;
	}

	// Shooting
	if (keys.Space && timestamp - player.lastTimeFiredBall > game.fireInterval) {
		wizard.classList.add('wizard-fire');
		showFireBall(player);
		player.lastTimeFiredBall = timestamp;
	} else {
		wizard.classList.remove('wizard-fire');
	}

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

	// Moving the wizard
	wizard.style.top = player.y + 'px';
	wizard.style.left = player.x + 'px';

	const fireBalls = Array.from(document.querySelectorAll('.fire-ball'));
	const clouds = Array.from(document.querySelectorAll('.cloud'));
	const bugs = Array.from(document.querySelectorAll('.bug'));

	// Moving the fire balls
	fireBalls.forEach((fb) => {
		fb.x += game.speed * game.fireBallMultiplayer;
		fb.style.left = fb.x + 'px';

		if (fb.x + fb.offsetWidth > gameArea.offsetWidth) {
			fb.parentElement.removeChild(fb);
		}
	});

	// Moving the clouds
	clouds.forEach((c) => {
		c.x -= game.speed;
		c.style.left = c.x + 'px';

		if (c.x + c.offsetWidth <= 0) {
			c.parentElement.removeChild(c);
		}
	});

	// Moving the bugs
	bugs.forEach((b) => {
		b.x -= game.speed * 3;
		b.style.left = b.x + 'px';

		if (b.x + b.offsetWidth <= 0) {
			b.parentElement.removeChild(b);
		}
	});

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

function showFireBall() {
	const fireBall = document.createElement('div');
	fireBall.classList.add('fire-ball');
	fireBall.style.top = player.y + player.height / 3 - 5 + 'px';
	fireBall.x = player.x + player.width;
	fireBall.style.left = fireBall.x + 'px';
	gameArea.appendChild(fireBall);
}

function showCloud(timestamp) {
	if (
		timestamp - scene.lastCloudSpawn >
		game.cloudSpawnInterval + 20000 * Math.random()
	) {
		const cloud = document.createElement('div');
		cloud.classList.add('cloud');
		cloud.x = gameArea.offsetWidth - 200;
		cloud.style.left = cloud.x + 'px';
		cloud.style.top = (gameArea.offsetHeight - 200) * Math.random() + 'px';

		gameArea.appendChild(cloud);
		scene.lastCloudSpawn = timestamp;
	}
}

function showBug(timestamp) {
	if (
		timestamp - scene.lastBugSpawn >
		game.bugSpawnInterval + 5000 * Math.random()
	) {
		let bug = document.createElement('div');
		bug.classList.add('bug');
		bug.x = gameArea.offsetWidth - 60;
		bug.style.left = bug.x + 'px';
		bug.style.top = (gameArea.offsetHeight - 60) * Math.random() + 'px';

		gameArea.appendChild(bug);
		scene.lastBugSpawn = timestamp;
	}
}

function onKeyUp(e) {
	keys[e.code] = false;
}

function onKeyDown(e) {
	keys[e.code] = true;
}
