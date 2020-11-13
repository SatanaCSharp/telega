export default function UserDB () {
    let UserDB = indexedDB.open('UserDB', 1);

    UserDB.onupgradeneeded = () => {
        console.log('need upgrade');
    }

    UserDB.onerror = () => {
        console.log('error')
    }

    UserDB.onsuccess = () => {
        console.log(UserDB.result)
    }
    return UserDB;
}

