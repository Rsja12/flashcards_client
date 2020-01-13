class Topics {
    constructor() {
        this.topics = []
        this.adapter = new TopicsAdapter()
        this.fetchAndLoadTopics()
    }

    fetchAndLoadTopics() {
        this.adapter.getTopics().then( topics => {
            console.table( topics )
        } )
    }
}