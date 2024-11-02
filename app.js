import {
  exportToJson,
  importFromJson,
  loadEntriesFromFile,
  entries,
} from "./jsonHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  loadEntriesFromFile(); // Charge les entrées automatiquement depuis le fichier JSON

  const diary = document.getElementById("diary");

  // Clone et ajoute le formulaire de template au journal dès le chargement
  const template = document
    .getElementById("day-template")
    .content.cloneNode(true);
  const entryForm = template.querySelector("article");

  // Sélectionne le bouton "Add on board" dans le clone
  const saveButton = entryForm.querySelector(".save-entry-btn");

  // Ajoute un événement pour enregistrer les données saisies
  saveButton.addEventListener("click", () => {
    const entryData = getEntryData(entryForm); // Récupère les données du formulaire
    entries.push(entryData); // Ajoute l'entrée au tableau entries
    displayEntry(entryData); // Affiche les données dans le journal
  });

  // Ajoute le formulaire cloné au journal
  diary.appendChild(template);

  // Attache les boutons d'import/export JSON
  document
    .getElementById("export-json-btn")
    .addEventListener("click", exportToJson);
  document
    .getElementById("import-json-btn")
    .addEventListener("change", (event) => {
      importFromJson(event.target.files[0]);
    });
});

function getEntryData(entryContainer) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    date: today,
    description: entryContainer.querySelector(".day-description")?.value || "",
    w3schools: entryContainer.querySelector(".input-w3schools")?.value || "",
    learning: entryContainer.querySelector(".input-learning")?.value || "",
    studi: entryContainer.querySelector(".input-studi")?.value || "",
    melvynx: entryContainer.querySelector(".input-melvynx")?.value || "",
    code: entryContainer.querySelector(".input-code")?.value || "",
    notes: entryContainer.querySelector(".textarea-notes")?.value || "",
  };
}

export function displayEntry(entryData) {
  const diary = document.getElementById("diary");

  const entryElement = document.createElement("article");
  entryElement.innerHTML = `
    <h3 class="date-title">${entryData.date}</h3>
    <p>${entryData.description}</p>
    <table>
      <tr><th>W3Schools</th><td>${entryData.w3schools}</td></tr>
      <tr><th>Learning</th><td>${entryData.learning}</td></tr>
      <tr><th>Studi</th><td>${entryData.studi}</td></tr>
      <tr><th>Melvynx</th><td>${entryData.melvynx}</td></tr>
      <tr><th>Code</th><td>${entryData.code}</td></tr>
      <tr><th>Notes</th><td>${entryData.notes}</td></tr>
    </table>
  `;
  diary.appendChild(entryElement);
}
