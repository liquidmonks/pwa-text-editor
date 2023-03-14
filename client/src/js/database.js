// Import the 'openDB' function from the 'idb' package
import { openDB } from "idb";

// Define an async function to initialize the database
const initdb = async () =>
  openDB("jate", 1, {
    // Define an 'upgrade' function to create the database if it doesn't exist
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Define an async function to add data to the database
export const putDb = async (content) => {
  console.log("PUT to the database");

  // Open the 'jate' database
  const contactDb = await openDB("jate", 1);

  // Start a transaction to read and write data
  const tx = contactDb.transaction("jate", "readwrite");

  // Get the object store for the 'jate' database
  const store = tx.objectStore("jate");

  // Add the 'content' to the database
  const request = store.put({ id: 1, value: content });

  // Wait for the request to complete and log the result
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// Define an async function to retrieve data from the database
export const getDb = async () => {
  console.error("getDb not implemented");

  // Open the 'jate' database
  const contactDb = await openDB("jate", 1);

  // Start a read-only transaction to retrieve data
  const tx = contactDb.transaction("jate", "readonly");

  // Retrieve all the daata from the object store
  const request = store.getAll();

  // Wait for request to complete and log the result
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

// Call the initdB function to create the database
initdb();
