class Topic {
    constructor(topic) {
        this.id = topic.id
        this.name = topic.name
        this.flashcards = topic.flashcards ? topic.flashcards : []
    }

    renderTopicName() {
        return `<div id="topic-list" class="topic-list" data-id=${this.id}>${this.name}</div>`
    }

}