const romanticWords = [
      "love", "forever", "kiss", "hug", "langga",
      "lovey", "mahal", "baby", "iloveyou", "march52024",
      "imissyou", "monthsary", "minion", "shamae", "sugam"
    ];

    const wordEl = document.getElementById("word");
    const textEl = document.getElementById("text");
    const scoreEl = document.getElementById("score");
    const timeEl = document.getElementById("time");
    const tryAgainBtn = document.getElementById("tryAgain");

    let randomWord;
    let score = 0;
    let time = 20;
    let timer;

    function getRandomWord() {
      return romanticWords[Math.floor(Math.random() * romanticWords.length)];
    }

    function displayWord() {
      randomWord = getRandomWord();
      wordEl.textContent = randomWord;
    }

    textEl.addEventListener("input", () => {
      const typed = textEl.value.trim();
      if (typed === randomWord) {
        score++;
        scoreEl.textContent = "Score: " + score;
        displayWord();
        textEl.value = "";
        time += 2; //
      }
    });

    function updateTime() {
      time--;
      timeEl.textContent = "Time: " + time + "s";
      if (time <= 0) {
        clearInterval(timer);
        wordEl.textContent = "❤️‍🔥 Game Over ❤️‍🔥";
        textEl.disabled = true;
        tryAgainBtn.style.display = "inline-block";
      }
    }

    function startGame() {
      score = 0;
      time = 30;
      scoreEl.textContent = "Score: 0";
      timeEl.textContent = "Time: 30s";
      textEl.disabled = false;
      textEl.value = "";
      tryAgainBtn.style.display = "none";
      displayWord();
      clearInterval(timer);
      timer = setInterval(updateTime, 1000);
    }

    tryAgainBtn.addEventListener("click", startGame);

    startGame();

    function createHeart() {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerHTML = "🌷";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 20 + 20 + "px";
      heart.style.animationDuration = Math.random() * 3 + 3 + "s";
      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 6000);
    }
    setInterval(createHeart, 800);