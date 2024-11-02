import { displayEntry } from "./app.js"; // Assure-toi que displayEntry est exportée de app.js

export let entries = [];

// Fonction pour exporter les entrées en JSON
export function exportToJson() {
  const dataStringified = JSON.stringify(entries, null, 2);
  const blob = new Blob([dataStringified], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "dev_diary_entries.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Fonction pour importer les données JSON d'un fichier et les afficher
export function importFromJson(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const importedEntries = JSON.parse(event.target.result);
      importedEntries.forEach((entry) => {
        entries.push(entry);
        displayEntry(entry); // Affiche chaque entrée
      });
    } catch (error) {
      console.log("Error while importing JSON file", error);
    }
  };
  reader.readAsText(file);
}

// Fonction pour charger automatiquement les données JSON dès l'arrivée sur la page
export function loadEntriesFromFile() {
  // Exemple d'URL de fichier JSON. Assure-toi que le fichier JSON est accessible depuis ton serveur ou système de fichiers
  fetch("./json/dev_diary_entries.json") // Mets à jour avec le chemin correct
    .then((response) => response.json())
    .then((data) => {
      data.forEach((entry) => {
        entries.push(entry);
        displayEntry(entry); // Affiche chaque entrée
      });
    })
    .catch((error) => {
      console.error("Erreur lors du chargement du fichier JSON:", error);
    });
}
