var storage = {
    set(key, value) {
        localStorage.setItem(key, value)
    },
    get(key) {
        localStorage.getItem(key)
    }
}

export default storage