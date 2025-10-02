const gameArea = document.getElementById("gameArea");
  const player = document.getElementById("player");
  const scoreBoard = document.getElementById("scoreBoard");
  const timerDisplay = document.getElementById("timer");
  const leftBtn = document.getElementById("leftBtn");
  const rightBtn = document.getElementById("rightBtn");
  const message = document.getElementById("message");
  const gameOverScreen = document.getElementById("gameOver");
  const finalText = document.getElementById("finalText");
  const restartBtn = document.getElementById("restartBtn");

  let score = 0;
  let playerPos = 150;
  let gameRunning = true;
  let timeLeft = 30;
  let fallSpeed = 3; // initial speed

  // Move player function
  function movePlayer(direction) {
    if (!gameRunning) return;
    if (direction === "left" && playerPos > 0) {
      playerPos -= 20;
    } else if (direction === "right" && playerPos < 300) {
      playerPos += 20;
    }
    player.style.left = playerPos + "px";
  }

  // Button controls
  leftBtn.addEventListener("touchstart", () => movePlayer("left"));
  rightBtn.addEventListener("touchstart", () => movePlayer("right"));

  // Create falling hearts
  function createHeart() {
    if (!gameRunning) return;
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 330 + "px";
    gameArea.appendChild(heart);

    let heartPos = 0;
    const fall = setInterval(() => {
      if (!gameRunning) {
        clearInterval(fall);
        if (gameArea.contains(heart)) gameArea.removeChild(heart);
        return;
      }

      heartPos += fallSpeed;
      heart.style.top = heartPos + "px";

      // Collision detection
      if (
        heartPos > 460 &&
        parseInt(heart.style.left) > playerPos - 20 &&
        parseInt(heart.style.left) < playerPos + 50
      ) {
        score++;
        scoreBoard.textContent = "Score: " + score;
        gameArea.removeChild(heart);
        clearInterval(fall);

        // Show sweet message at milestones
        if (score === 5) {
          showMessage("You caught my love 💕");
        }
        if (score === 10) {
          showMessage("My heart is yours 😍")
        }
        if (score === 15) {
          showMessage("I LOVE YOU SO MUCH! 💓")
        }
      }

      // Remove heart if it falls off
      if (heartPos > 500) {
        if (gameArea.contains(heart)) gameArea.removeChild(heart);
        clearInterval(fall);
      }
    }, 30);
  }

  // Sweet message display
  function showMessage(text) {
    message.textContent = text;
    message.style.display = "block";
    setTimeout(() => {
      message.style.display = "none";
    }, 1500);
  }

  // Game timer
  const timer = setInterval(() => {
    if (!gameRunning) return;
    timeLeft--;
    timerDisplay.textContent = "Time: " + timeLeft;

    // Increase difficulty every 5 seconds
    if (timeLeft % 5 === 0) {
      fallSpeed++;
    }

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  // Spawn hearts
  const heartSpawner = setInterval(() => {
    if (gameRunning) createHeart();
  }, 1200);

  // End game
  function endGame() {
    gameRunning = false;
    finalText.textContent = "Game Over! Final Score: " + score;
    gameOverScreen.style.display = "flex";
  }

  // Restart game
  restartBtn.addEventListener("click", () => {
    score = 0;
    playerPos = 150;
    timeLeft = 30;
    fallSpeed = 3;
    gameRunning = true;
    scoreBoard.textContent = "Score: 0";
    timerDisplay.textContent = "Time: 30";
    gameOverScreen.style.display = "none";
  });