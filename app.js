let entries = [];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("add-entry-btn").addEventListener("click", () => {
    // Clone and append template
    const diary = document.getElementById("diary");
    const template = document
      .getElementById("day-template")
      .content.cloneNode(true);
    diary.appendChild(template);

    // get and add entry data
    const entryData = getEntryData();
    entries.push(entryData); // register entry
    displayEntry(entryData); // display entry
  });

  document.getElementById("export-json-btn").addEventListener("click", () => {
    exportToJson();
  });

  document.getElementById("import-json-btn").addEventListener("click", () => {
    importFromJson(event.target.files[0]);
  });
});

function getEntryData() {
  const lastEntry = document.getElementById("diary").lastElementChild;

  const today = new Date();
  const date = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    date: today,
    description: document.querySelector(".day-description").value || "",
    w3schools: document.querySelector(".input-w3schools").value || "",
    learning: document.querySelector(".input-learning").value || "",
    studi: document.querySelector(".input-studi").value || "",
    melvynx: document.querySelector(".input-melvynx").value || "",
    code: document.querySelector(".input-code").value || "",
    notes: document.querySelector(".textarea-notes").value || "",
  };
}

function displayEntry(entryData) {
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

function exportToJson() {
  const dataStr = JSON.stringify(entries);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "dev.diary.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importFromJson(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const importedEntries = JSON.parse(event.target.result);
      importedEntries.forEach((entry) => {
        entries.push(entry);
        displayEntry(entry);
      });
    } catch (error) {
      console.log(error);
    }
  };
  reader.readAsText(file);
}
