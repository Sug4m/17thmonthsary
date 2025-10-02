const pictures = [
      "pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg",
      "pic5.jpg", "pic6.jpg", "pic7.jpg", "pic8.jpg"
    ];

    let cardsArray, firstCard, secondCard, lockBoard, matches, timeLeft, timer;

    function startGame() {
      const grid = document.getElementById("grid");
      grid.innerHTML = "";
      document.getElementById("result").textContent = "";

      // Duplicate & shuffle pictures
      cardsArray = [...pictures, ...pictures]
        .sort(() => Math.random() - 0.5);

      matches = 0;
      firstCard = null;
      secondCard = null;
      lockBoard = false;

      // Set timer (60 seconds default)
      timeLeft = 90;
      document.getElementById("timer").textContent = `⏳ Time left: ${timeLeft}s`;
      clearInterval(timer);
      timer = setInterval(updateTimer, 1000);

      // Create cards
      cardsArray.forEach((pic, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.pic = pic;
        card.dataset.index = index;

        card.innerHTML = `
          <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back" style="background-image: url('${pic}')"></div>
          </div>
        `;

        card.addEventListener("click", () => flipCard(card));
        grid.appendChild(card);
      });
    }

    function updateTimer() {
      timeLeft--;
      document.getElementById("timer").textContent = `⏳ Time left: ${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById("result").textContent = "⏰ Time's up! Game Over 🧸";
        lockBoard = true; // block game
      }
    }

    function flipCard(card) {
      if (lockBoard || card.classList.contains("flipped")) return;

      card.classList.add("flipped");

      if (!firstCard) {
        firstCard = card;
      } else {
        secondCard = card;
        checkMatch();
      }
    }

    function checkMatch() {
      if (firstCard.dataset.pic === secondCard.dataset.pic) {
        matches++;
        resetTurn();
        if (matches === pictures.length) {
          clearInterval(timer);
          document.getElementById("result").textContent = "🎉 You found all the picture pairs! 💕";
        }
      } else {
        lockBoard = true;
        setTimeout(() => {
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          resetTurn();
        }, 1000);
      }
    }

    function resetTurn() {
      [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    // Start game on load
    startGame();