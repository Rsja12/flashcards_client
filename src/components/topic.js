class Topic {
    constructor(topic) {
        this.id = topic.id
        this.name = topic.name
    }

    renderTopicName() {
        return `<li>${this.name}</li>`
    }
}