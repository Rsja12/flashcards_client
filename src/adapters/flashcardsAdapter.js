class FlashcardsAdapter {
    constructor() {
        this.baseURL = `http://localhost:3000/flashcards`
    }

    getCards() {
        return fetch(this.baseURL)
        .then(res => res.json())
    }
}