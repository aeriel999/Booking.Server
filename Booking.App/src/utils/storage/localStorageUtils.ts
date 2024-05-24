export const addLocalStorage = (keyStorage: string, value: string): void => {
    localStorage.setItem(keyStorage, JSON.stringify(value));
};

export const deleteLocalStorage = (keyStorage: string): void => {
    localStorage.removeItem(keyStorage);
};

export const getLocalStorage = (keyStorage: string) : string | null => {
    const storedValue = localStorage.getItem(keyStorage);
    console.log("storedValue", storedValue)
    if (storedValue !== null) {
        return JSON.parse(storedValue);
    }
    else {
        return null;
    }
};