class Topic {
    constructor(topic) {
        this.id = topic.id
        this.name = topic.name
    }

    renderTopic() {
        return `<li>${this.name}</li>`
    }
}