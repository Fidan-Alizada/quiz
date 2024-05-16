
const questions = [
  {
    question: "What is the lap length on the Formula 1 track in Azerbaijan?",
    answers: [
      { text: "6013 m", correct: false },
      { text: "6003 m", correct: true },
      { text: "6103 m", correct: false },
      { text: "6013 m", correct: false }
    ]
  },
  {
    question: "How many times has Michael Schumacher won the world title?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "2", correct: false },
      { text: "7", correct: true }
    ]
  },
  {
    question: "Which team set the world record for a pit stop of 1.8 seconds?",
    answers: [
      { text: "Ferrari", correct: false },
      { text: "Red Bull", correct: false },
      { text: "McLaren", correct: true },
      { text: "Aston Martin", correct: false }
    ]
  },
  {
    question: "In what year was the first Formula 1 World Championship held?",
    answers: [
      { text: "1946", correct: false },
      { text: "1950", correct: true },
      { text: "1955", correct: false },
      { text: "1960", correct: false }
    ]
  },
  {
    question: "What is the nickname of the Formula 1 Grand Prix held in Monaco?",
    answers: [
      { text: "The Jewel in the Crown", correct: true },
      { text: "The Flying Lap", correct: false },
      { text: "The Street King", correct: false },
      { text: "The Monte Carlo Run", correct: false }
    ]
  },
  {
    question: "Which driver won the 2021 Formula 1 World Championship?",
    answers: [
      { text: "Lewis Hamilton", correct: false },
      { text: "Max Verstappen", correct: true },
      { text: "Sebastian Vettel", correct: false },
      { text: "Charles Leclerc", correct: false }
    ]
  },
  {
    question: "Which circuit is known as the 'Home of British Motor Racing'?",
    answers: [
      { text: "Silverstone", correct: true },
      { text: "Brands Hatch", correct: false },
      { text: "Donington Park", correct: false },
      { text: "Goodwood", correct: false }
    ]
  },
  {
    question: "Who holds the record for the most championship titles in Formula 1 history?",
    answers: [
      { text: "Michael Schumacher", correct: false },
      { text: "Lewis Hamilton", correct: true },
      { text: "Juan Manuel Fangio", correct: false },
      { text: "Sebastian Vettel", correct: false }
    ]
  },
  {
    question: "How many Grand Prix races are typically held in a Formula 1 season?",
    answers: [
      { text: "18", correct: false },
      { text: "22", correct: true },
      { text: "24", correct: false },
      { text: "20", correct: false }
    ]
  },
  {
    question: "Which team holds the record for the most constructor championships in Formula 1?",
    answers: [
      { text: "Mercedes", correct: false },
      { text: "Ferrari", correct: true },
      { text: "McLaren", correct: false },
      { text: "Williams", correct: false }
    ]
  },
];

document.addEventListener('DOMContentLoaded', () => {
  nextButton.classList.add('hide');
});

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultsElement = document.createElement('div');
resultsElement.setAttribute('id', 'results');
resultsElement.classList.add('results', 'hide');
const quizAppElement = document.getElementById('quiz-task');
quizAppElement.appendChild(resultsElement);

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timerInterval;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  currentQuestionIndex++;
  setNextQuestion();
});

function startTimer(duration, display) {
  let timer = duration, seconds;
  timerInterval = setInterval(function () {
    seconds = parseInt(timer % 60, 10);

    display.textContent = `Timer 00:${seconds < 10 ? "0" : ""}${seconds}`;
    updateProgressBar(timer, duration);

    if (--timer < 0) {
      clearInterval(timerInterval);
      timer = duration;
      selectAnswer(null);
    }
  }, 1000);
}

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
  document.getElementById('timer').classList.remove('hide');
  document.getElementById('progress-bar-container').classList.remove('hide');
  nextButton.classList.remove('hide');
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  startTimer(30, document.getElementById('timer'));
  updateProgressBar(30, 30);
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', () => selectAnswer(button));
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(selectedButton) {
  clearInterval(timerInterval);
  Array.from(answerButtonsElement.children).forEach(button => {
    button.disabled = true;
    setStatusClass(button, button.dataset.correct);
  });

  const correct = selectedButton ? selectedButton.dataset.correct : false;
  if (correct) {
    score++;
  }
  setStatusClass(selectedButton, correct);

  setTimeout(() => {
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      concludeQuiz();
    }
  }, 1000);
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function concludeQuiz() {
  questionContainerElement.classList.add('hide');
  nextButton.classList.add('hide');
  document.getElementById('timer').classList.add('hide');
  document.getElementById('progress-bar-container').classList.add('hide');

  resultsElement.classList.remove('hide');
  resultsElement.innerHTML = `
    <p>Your score: ${score} out of ${shuffledQuestions.length}</p>
  `;
  quizAppElement.appendChild(resultsElement);
}

function restartQuiz() {
  resultsElement.classList.add('hide');
  score = 0;
  currentQuestionIndex = 0;
  startGame();
}

function updateProgressBar(currentTime, duration) {
  const progressBar = document.getElementById('progress-bar');
  const progress = ((duration - currentTime) / duration) * 100;
  progressBar.style.width = progress + '%';
}
