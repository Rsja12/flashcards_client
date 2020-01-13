class Topics {
    constructor() {
        this.topics = []
        this.adapter = new TopicsAdapter()
        this.fetchAndLoadTopics()
    }

    fetchAndLoadTopics() {
        this.adapter.getTopics()
        .then( topics => {
            topics.forEach( topic => this.topics.push( topic ) )
        } )
        .then( () => {
            this.renderTopics()
        } )
    }

    renderTopics() {
        const topicsBox = document.getElementById( 'topics-container' )
        topicsBox.innerHTML = 'testing'
    }
}

