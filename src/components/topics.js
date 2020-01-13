class Topics() {
    constructor() {
        this.topics = []
        this.adapter = new TopicsAdapter()
        this.bindEventListeners()
    }
}