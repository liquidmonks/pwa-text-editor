import { openDB } from "idb";

// Initializes the 'jate' database with a single object store named 'jate'.
// The object store has an auto-incrementing key path with the property name 'id'.
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

// Adds a new object to the 'jate' object store with a key of 1 and the provided content.
export const putDb = async (content) => {
  console.log("Put to the database");

  const jateDb = await openDB("jate", 1);

  const tx = jateDb.transaction("jate", "readwrite");

  const store = tx.objectStore("jate");

  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// Retrieves the object with key 1 from the 'jate' object store and returns its 'value' property.
export const getDb = async () => {
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(1);
  const result = await request;
  return result?.value;
};

// Initializes the 'jate' database when the module is imported.
initdb();
