

export function openDB(dbName = 'MyDB', storeName = 'MyStore') {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);
        request.onerror = event => reject('Database error: ' + event.target.errorCode);
        request.onsuccess = event => resolve(event.target.result);
        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: 'name' });
            }
        };
    });
}

export async function getAllItems(dbName = 'MyDB', storeName = 'MyStore') {
    const db = await openDB(dbName, storeName);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject('Error fetching items');
    });
}
 export async function getFileByName(name, dbName = 'MyDB', storeName = 'FileStore') {
    const db = await openDB(dbName, storeName);
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    return new Promise((resolve, reject) => {
        const request = store.get(name);
        request.onsuccess = () => resolve(request.result?.data || null);
        request.onerror = () => reject('Error getting file');
    });
}
export async function deleteFileByName(name, dbName = 'MyDB', storeName = 'FileStore') {
    const db = await openDB(dbName, storeName);
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);

    store.delete(name);

    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject('Failed to delete file');
    });
}

