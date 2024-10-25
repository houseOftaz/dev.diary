document.getElementById("addEntryBtn").addEventListener("click", () => {
  const template = document.getElementById("dayTemplate");
  const diary = document.getElementById("diary");

  // clone template and append to diary
  const newEntry = template.content.cloneNode(true);

  // define current date
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  newEntry.querySelector(".date-title").textContent = today;

  // add event to save entry
  newEntry.querySelector(".save-entry-btn").addEventListener("click", () => {
    // get inputs data
    const entryData = {
      date: today,
      description: newEntry.querySelector(".day-description").value,
      w3schools: newEntry.querySelector(".input-w3schools").value,
      learning: newEntry.querySelector(".input-learning").value,
      studi: newEntry.querySelector(".input-studi").value,
      melvynx: newEntry.querySelector(".input-melvynx").value,
      code: newEntry.querySelector(".input-code").value,
      notes: newEntry.querySelector(".textarea-notes").value,
    };

    localStorage.setItem(`entry-${today}`, JSON.stringify(entryData));

    alert("Entry saved!");
  });

  diary.appendChild(newEntry);
});
