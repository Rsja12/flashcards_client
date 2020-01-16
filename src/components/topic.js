class Topic {
    constructor(topic) {
        this.id = topic.id
        this.name = topic.name
        this.flashcards = topic.flashcards 
    }

    renderTopicName() {
        return `<li data-id=${this.id}>${this.name}</li>`
    }

}