import { getResults } from "./firebase.js";

document.addEventListener("DOMContentLoaded", async function () {
  // Fetch your data (example using fetch API)
  try {
    const data = await getResults();
    var tableBody = document.querySelector("#data-table tbody");

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Loop through the data and populate table rows
    data.forEach((item) => {
      var row = tableBody.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);

      // Populate cells with data
      cell1.textContent = item.name;
      cell2.textContent = item.score;
    });
  } catch (error) {
    console.log(error);
  }
});
