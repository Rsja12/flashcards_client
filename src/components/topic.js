class Topic {
    constructor(topic) {
        this.id = topic.id
        this.name = topic.name
        this.flashcards = topic.flashcards ? topic.flashcards : []
    }

    // renderTopicName() {
    //     return `<div id="topic-list" class="topic-list" data-id=${this.id}>${this.name}</div>`
    // }

    renderTopicName() {
        return `
            <div data-id=${this.id}>
                <h4 class="topic-list" data-id=${this.id}>${this.name}</h4>
                <button class="topic-btn" data-id=${this.id} id="topic-btn">Show Cards</button>
            </div>
        `
    }

}