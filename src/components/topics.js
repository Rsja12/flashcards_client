class Topics {
    constructor() {
        this.topics = []
        this.adapter = new TopicsAdapter()
        this.fetchAndLoadTopics()
        this.initListeners()
    }

    initListeners() {
        this.topicsBox = document.getElementById( 'topics-container' )
    }

    fetchAndLoadTopics() {
        this.adapter.getTopics()
        .then(topics => {
            topics.forEach(topic => this.topics.push(new Topic(topic)))
        })
        .then( () => {
            this.renderTopics()
        })
    }

    renderTopics() {
        this.topicsBox.innerHTML = this.topics.map(topic => topic.renderTopicName()).join('')
    }
}

