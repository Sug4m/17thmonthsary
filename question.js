const quizData = [
      { question: "When is our monthsary?? (M/D/Y, ex.01012025 )", answer: "05052024" },
      { question: "Who liked us first?? (first name)", answer: "trisha" },
      { question: "What is our first theme song??", answer: "baliw sayo" },
      { question: "Where did we go on my birthday??", answer: "star city" },
      { question: "Where did we meet??", answer: "church" },
      { question: "What is our favorite color??", answer: "purple" },
      { question: "What game do we always play??", answer: "call of duty" },
      { question: "Where is our first date??", answer: "ayala mall" },
      { question: "Who is the first move??", answer: "justin"},
      { question: "I love you", answer: "i love you more"}
    ];

    const questionContainer = document.getElementById("questionContainer");
    const answerInput = document.getElementById("answerInput");
    const submitBtn = document.getElementById("submitBtn");
    const timerEl = document.getElementById("timer");
    const feedbackEl = document.getElementById("feedback");
    const resultEl = document.getElementById("result");
    const tryAgainBtn = document.getElementById("tryAgainBtn");

    let currentIndex = 0;
    let score = 0;
    let timeLeft = 12;
    let timer;

    function loadQuestion() {
      const currentQ = quizData[currentIndex];
      questionContainer.innerHTML = `<div class="question">${currentQ.question}</div>`;
      answerInput.value = "";
      feedbackEl.textContent = "";
      timeLeft = 12;
      timerEl.textContent = `⏳ Time left: ${timeLeft}s`;
      clearInterval(timer);
      timer = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
      timeLeft--;
      timerEl.textContent = `⏳ Time left: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        feedbackEl.textContent = `⏰ Time's up! Correct answer: ${quizData[currentIndex].answer}`;
        feedbackEl.style.color = "yellow";
        setTimeout(nextQuestion, 1500);
      }
    }

    submitBtn.addEventListener("click", () => {
      checkAnswer();
    });

    function checkAnswer() {
      clearInterval(timer);
      const currentQ = quizData[currentIndex];
      const playerAnswer = answerInput.value.trim().toLowerCase();

      if (playerAnswer === currentQ.answer) {
        feedbackEl.textContent = "✅ Correct!";
        feedbackEl.style.color = "lightgreen";
        score++;
      } else {
        feedbackEl.textContent = `❌ Wrong! Correct answer: ${currentQ.answer}`;
        feedbackEl.style.color = "yellow";
      }

      setTimeout(nextQuestion, 1200);
    }

    function nextQuestion() {
      currentIndex++;
      if (currentIndex < quizData.length) {
        loadQuestion();
      } else {
        showResult();
      }
    }

    function showResult() {
      questionContainer.innerHTML = "";
      answerInput.style.display = "none";
      submitBtn.style.display = "none";
      timerEl.style.display = "none";
      feedbackEl.style.display = "none";
      resultEl.innerHTML = ` You scored ${score} out of ${quizData.length}! 💖<br>
        ${score === quizData.length ? "Perfect! You really know about us 😍" : "Better luck next time 🧸"}`;
      tryAgainBtn.style.display = "inline-block";
    }

    function startGame() {
      currentIndex = 0;
      score = 0;
      answerInput.style.display = "inline-block";
      submitBtn.style.display = "inline-block";
      timerEl.style.display = "block";
      feedbackEl.style.display = "block";
      resultEl.innerHTML = "";
      tryAgainBtn.style.display = "none";
      loadQuestion();
    }

    tryAgainBtn.addEventListener("click", startGame);

    // Start game on load

    startGame();
