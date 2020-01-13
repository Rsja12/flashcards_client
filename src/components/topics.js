class Topics {
    constructor() {
        this.topics = []
        this.adapter = new TopicsAdapter()
        this.bindEventListeners()
        this.fetchAndLoadTopics()
    }

    fetchAndLoadTopics() {
        this.adapter.getTopics()
        .then( topics => {
            console.log( topics )
        } )
    }
}