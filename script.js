(function () {
  emailjs.init("eMRFbQsphPppkQ1q-"); 
})();

const startButton = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const questionScreenEl = document.getElementById('question-screen');
const endScreen = document.querySelector('.end');
const questionNo = document.getElementById('current-question');
const totalQuestions = document.getElementById('total');
const questionText = document.getElementById('question').querySelector("p");
const inputEl = document.querySelector('.input-el input');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');
const continueButton = document.getElementById('continue-btn');
const progressBar = document.getElementById('progress');

let currentIndex = 0;
let answers = [];

const questions = [
  {
    question: "Do you have anything against this wedding?"
  },
  {
    question: "Where should the wedding be held?",
    options: [
      { text: "Amphitheatre" },
      { text: "Stadium" },
      { text: "Cafeteria" },
      { text: "WRA" }
    ]
  },
  {
    question: "Pick a color combination",
    options: [
      { text: "Black and Gold" },
      { text: "Silver and Navy Blue" },
      { text: "Wine and Red" },
      { text: "Green and Black" }
    ]
  },
  {
    question: "Do you have any suggestions?"
  }
];


startButton.addEventListener("click", () => {
  startScreen.classList.remove('active');
  questionScreenEl.classList.add('active');
  totalQuestions.textContent = questions.length;
  showQuestion();
});

function showQuestion() {
  const currentQuestion = questions[currentIndex];
  questionNo.textContent = currentIndex + 1;
  questionText.textContent = currentQuestion.question;

  inputEl.value = "";
  inputEl.style.visibility = "hidden";
  optionsContainer.innerHTML = "";
  optionsContainer.style.visibility = "hidden";

  if (currentQuestion.options) {
    optionsContainer.style.visibility = "visible";

    currentQuestion.options.forEach(option => {
      const p = document.createElement("p");
      p.textContent = option.text;

      if (answers[currentIndex] === option.text) {
        p.classList.add("selected");
      }

      p.addEventListener("click", () => {
        answers[currentIndex] = option.text;

        const allOptions = optionsContainer.querySelectorAll("p");
        allOptions.forEach(el => el.classList.remove("selected"));
        p.classList.add("selected");
      });

      optionsContainer.appendChild(p);
    });
  } else {
    inputEl.style.visibility = "visible";
    inputEl.value = answers[currentIndex] || "";

    inputEl.oninput = () => {
      answers[currentIndex] = inputEl.value;
    };
  }

  const progress = ((currentIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

nextButton.addEventListener("click", () => {
  
  if (!questions[currentIndex].options) {
    answers[currentIndex] = inputEl.value.trim();
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    showQuestion();
  } else {
    questionScreenEl.classList.remove('active');
    endScreen.style.display = 'block';
  }
});

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showQuestion();
  }
});

continueButton.addEventListener("click", () => {
  const message = answers.map((ans, index) => `Q${index + 1}: ${ans}`).join("\n");

  emailjs.send("service_blrqt88", "template_n4n8q89", {
    message: message
  })
  .then(function (response) {
    console.log("SUCCESS!", response.status, response.text);
    alert("Your responses have been sent. Thank you!");
  }, function (error) {
    console.log("FAILED...", error);
    alert("Something went wrong. Please try again.");
  });
});
