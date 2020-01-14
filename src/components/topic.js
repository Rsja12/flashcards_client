class Topic {
    constructor(topic) {
        this.id = topic.id
        this.name = topic.name
    }

    renderTopicName() {
        return `<li data-id=${this.id}><i class="far fa-trash-alt"></i>${this.name}<i class="far fa-edit"></i></li>`
    }
}