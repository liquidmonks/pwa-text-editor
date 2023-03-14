import { openDB } from "idb";

// Initialize the database
const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Save content to the database
export const putDb = async (content) => {
  console.log("Put to the database");

  const jateDb = await openDB("jate", 1);

  const tx = jateDb.transaction("jate", "readwrite");

  const store = tx.objectStore("jate");

  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// Retrieve content from the database
export const getDb = async () => {
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(1);
  const result = await request;
  return result?.value;
};

// Call initdb function to initialize the database
initdb();
