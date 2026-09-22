const questions = [
        { q: "What does HTML stand for?", answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Movie Language", "Hyper Tool Multi Language"], correct: 0 },
        { q: "Which HTML tag is used to define an internal style sheet?", answers: ["<css>", "<script>", "<style>", "<link>"], correct: 2 },
        { q: "Which property is used in CSS to change the background color?", answers: ["color", "background-color", "bgcolor", "canvas-color"], correct: 1 },
        { q: "How do you write 'Hello World' in an alert box in JavaScript?", answers: ["msg('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');", "alert('Hello World');"], correct: 3 },
        { q: "Which HTML element is used for the largest heading?", answers: ["<heading>", "<h6>", "<head>", "<h1>"], correct: 3 },
        { q: "How do you choose an element with id 'demo' in CSS?", answers: [".demo", "#demo", "*demo", "demo"], correct: 1 },
        { q: "Inside which HTML element do we put the JavaScript code?", answers: ["<javascript>", "<script>", "<js>", "<scripting>"], correct: 1 },
        { q: "Which CSS property controls the text size?", answers: ["font-style", "text-size", "font-size", "text-style"], correct: 2 },
        { q: "How do you create a function in JavaScript?", answers: ["function myFunction()", "function:myFunction()", "function = myFunction()", "new function()"], correct: 0 },
        { q: "Which HTML tag is used to create a hyperlink?", answers: ["<link>", "<a>", "<href>", "<url>"], correct: 1 }
      ];

      let current = 0;
      let score = 0;
      let attempts = 1;

      const qEl = document.getElementById("question");
      const aEl = document.getElementById("answers");
      const nextBtn = document.getElementById("next");
      const restartBtn = document.getElementById("restart");
      const toastEl = document.getElementById("toast");
      const qCountEl = document.getElementById("question-count");
      const liveScoreEl = document.getElementById("live-score");
      const historyContainer = document.getElementById("history-container");
      const historyList = document.getElementById("history-list");

      function load() {
        nextBtn.style.display = "none";
        aEl.innerHTML = "";
        
        qCountEl.style.display = "block";
        qCountEl.textContent = `Question ${current + 1} of ${questions.length}`;
        liveScoreEl.textContent = `Score: ${score}`;
        
        const q = questions[current];
        qEl.textContent = q.q;

        q.answers.forEach((ans, i) => {
          const btn = document.createElement("button");
          btn.className = "answer";
          btn.textContent = ans;
          btn.onclick = () => selectAnswer(btn, i);
          aEl.appendChild(btn);
        });
      }
      
      load();

      function triggerToast(message, type) {
        toastEl.textContent = message;
        toastEl.className = `toast show ${type}`;
        setTimeout(() => {
          toastEl.className = "toast";
        }, 1800);
      }

      function selectAnswer(btn, index) {
        nextBtn.style.display = "block";
        const correctIndex = questions[current].correct;
        const buttons = aEl.querySelectorAll("button");

        buttons.forEach((b, i) => {
          b.disabled = true;
          if (i == correctIndex) {
            b.classList.add("correct");
          }
          if (i == index && i != correctIndex) {
            b.classList.add("wrong");
          }
        });

        if (index == correctIndex) {
          score++;
          liveScoreEl.textContent = `Score: ${score}`;
          triggerToast("Correct Answer! ✨", "success");
        } else {
          triggerToast("Wrong Answer! ❌", "error");
        }
      }

      nextBtn.onclick = () => {
        current++;
        if (current < questions.length) {
          load();
        } else {
          qCountEl.style.display = "none";
          qEl.textContent = `🎉 Quiz Finished! Your score is ${score} / ${questions.length}`;
          aEl.innerHTML = "";
          nextBtn.style.display = "none";
          restartBtn.style.display = "block";

          historyContainer.style.display = "block";
          const historyItem = document.createElement("div");
          historyItem.className = "history-item";
          historyItem.innerHTML = `<span>Attempt :${ attempts}</span> <span>Score: ${score}/${questions.length}</span>`;
          historyList.appendChild(historyItem);
        }
      };

      restartBtn.onclick = () => {
        current = 0;
        score = 0;
        attempts++;
        nextBtn.style.display = "block";
        restartBtn.style.display = "none";
        load();
      };
