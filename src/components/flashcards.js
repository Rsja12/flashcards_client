class Flashcards {
    constructor() {
        this.cardAdapter = new FlashcardsAdapter()
        this.fetchAndLoadCards()
    }

    fetchAndLoadCards() {
        this.cardAdapter.getCards()
    }
}