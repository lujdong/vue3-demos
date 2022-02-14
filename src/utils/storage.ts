class Storage<T> {
    set(key: string, value: T) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    get(key: string) {
        return JSON.parse(localStorage.getItem(key) ?? '{}')
    }

    remove(key: string) {
        localStorage.removeItem(key)
    }

    clear() {
        localStorage.clear()
    }
}

export const storage = new Storage()
