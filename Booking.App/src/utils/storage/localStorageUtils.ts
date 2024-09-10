export const addLocalStorage = (keyStorage: string, value: string): void => {
    localStorage.setItem(keyStorage, JSON.stringify(value));
};

export const getLocalStorage = (keyStorage: string): string | null => {
    const storedValue = localStorage.getItem(keyStorage);

    if (storedValue !== null) {
        return JSON.parse(storedValue);
    } else {
        return null;
    }
};

export const addlistToLocalStorage = (keyStorage: string, value: string[]): void => {
    localStorage.setItem(keyStorage, JSON.stringify(value));
};

export const getListFromLocalStorage = (keyStorage: string): string[] | null => {
    const storedValue = localStorage.getItem(keyStorage);

    if (storedValue !== null) {
        return JSON.parse(storedValue);
    } else {
        return null;
    }
}

export const deleteLocalStorage = (keyStorage: string): void => {
    localStorage.removeItem(keyStorage);
};


