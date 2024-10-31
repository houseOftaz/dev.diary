import { initDb, addEntry, loadEntries } from "./createDb.js";

document.addEventListener("DOMContentLoaded", () => {
  initDb();

  document.getElementById("add-entry-btn").addEventListener("click", () => {
    const diary = document.getElementById("diary");
    const template = document
      .getElementById("day-template")
      .content.cloneNode(true);
    diary.appendChild(template);

    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const lastEntry = diary.lastElementChild;

    const entryData = {
      date: today,
      description: lastEntry.querySelector(".day-description").value,
      w3schools: lastEntry.querySelector(".input-w3schools").value,
      learning: lastEntry.querySelector(".input-learning").value,
      studi: lastEntry.querySelector(".input-studi").value,
      melvynx: lastEntry.querySelector(".input-melvynx").value,
      code: lastEntry.querySelector(".input-code").value,
      notes: lastEntry.querySelector(".textarea-notes").value,
    };

    addEntry(entryData).then(() => displayEntry(entryData));
  });
});

function displayEntry(entryData) {
  const diary = document.getElementById("diary");

  const entryElement = document.createElement("article");
  entryElement.innerHTML = `
    <h3 class="date-title">${entryData.date}</h3>
    <p>${entryData.description}</p>
    <table>
      <tr><td>W3Schools</td><td>${entryData.w3schools}</td></tr>
      <tr><td>Learning</td><td>${entryData.learning}</td></tr>
      <tr><td>Studi</td><td>${entryData.studi}</td></tr>
      <tr><td>Melvynx</td><td>${entryData.melvynx}</td></tr>
      <tr><td>Code</td><td>${entryData.code}</td></tr>
      <tr><td>Notes</td><td>${entryData.notes}</td></tr>
    </table>
    `;
  diary.appendChild(entryElement);
}
