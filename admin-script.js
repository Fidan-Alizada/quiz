import { saveQuestion, getQuestions, deleteQuestion, getResults } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {

  fetchAndDisplayQuestions();
  fetchAndDisplayResults();
  // Handle form submission
  document.getElementById("question-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const questionText = document.getElementById("question-text").value;
    const answers = [
      { text: document.getElementById("answer1").value, correct: document.querySelector("input[name='correct-answer'][value='0']").checked },
      { text: document.getElementById("answer2").value, correct: document.querySelector("input[name='correct-answer'][value='1']").checked },
      { text: document.getElementById("answer3").value, correct: document.querySelector("input[name='correct-answer'][value='2']").checked },
      { text: document.getElementById("answer4").value, correct: document.querySelector("input[name='correct-answer'][value='3']").checked },
    ];

    await saveQuestion(questionText, answers);
    alert("Question added successfully!");
    document.getElementById("question-form").reset();
    fetchAndDisplayQuestions();
  });
});

async function fetchAndDisplayQuestions() {
  const questions = await getQuestions();
  const tableBody = document.querySelector("#questions-table tbody");
  tableBody.innerHTML = "";

  questions.forEach((question, index) => {
    const row = tableBody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);

    cell1.textContent = question.question;
    cell2.innerHTML = question.answers.map((answer, i) => `<p>${i + 1}: ${answer.text}</p>`).join("");
    cell3.textContent = question.answers.find(answer => answer.correct).text;
    cell4.innerHTML = `<button class="delete-btn" data-id="${question.id}">Delete</button>`;
  });

  // delete buttons
  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", async (event) => {
      const id = event.target.dataset.id;
      await deleteQuestion(id);
      fetchAndDisplayQuestions();
    });
  });
}

async function fetchAndDisplayResults() {
  const results = await getResults();
  const resultsTableBody = document.querySelector("#results-table tbody");
  resultsTableBody.innerHTML = "";

  results.forEach((result, index) => {
    const row = resultsTableBody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);

    cell1.textContent = result.name;
    cell2.textContent = result.score;
  });
}
