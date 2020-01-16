class Topic {
    constructor(topic) {
        this.id = topic.id
        this.name = topic.name
        this.cards = topic.cards 
    }

    renderTopicName() {
        return `<li data-id=${this.id}></i>${this.name}</li>`
    }


}