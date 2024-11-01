let db;

export function initDb() {
  const request = indexedDB.open("dev-diary", 1);

  request.onerror = (event) => {
    console.log("1 : Error opening database:", event.target.errorCode);
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("2 : Database opened successfully");
  };

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    const objectStore = db.createObjectStore("entries", {
      keyPath: "date",
    });
    objectStore.createIndex("date", "date", { unique: true });
    console.log("3 : Table 'entries' created successfully in database");
  };
}

export function addEntry(entryData) {
  const transaction = db.transaction(["entries"], "readwrite");
  const objectStore = transaction.objectStore("entries");

  const request = objectStore.add(entryData);
  request.onsuccess = () => {
    console.log("Entry added successfully:", request.result);
  };
  request.onerror = () => {
    console.log("Error adding entry:", request.error);
  };
}

export function loadEntries(callback) {
  const transaction = db.transaction(["entries"], "readonly");
  const objectStore = transaction.objectStore("entries");

  objectStore.openCursor().onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      callback(cursor.value);
      cursor.continue();
    } else {
      console.log("All entries loaded");
    }
  };
}
