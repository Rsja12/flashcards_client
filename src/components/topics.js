class Topics {
    constructor() {
        this.topics = []
        this.adapter = new TopicsAdapter()
        this.fetchAndLoadTopics()
        this.domElements()
        this.initListeners()
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

    domElements() {
        this.topicsBox = document.getElementById( 'topics-container' )
        this.topicForm = document.getElementById( 'topic-form' )
        this.topicName = document.getElementById( 'topic-name' )
    }

    initListeners() {
        this.topicForm.addEventListener('submit', this.createTopic.bind(this))
    }

    createTopic(e) {
        e.preventDefault()
        const name = this.topicName.value
        
        this.adapter.create(name)
        .then(topic => {
            this.topics.push(new Topic(topic))
            this.topic.value = ''
            this.renderTopics()
        })
    }

    renderTopics() {
        this.topicsBox.innerHTML = this.topics.map(topic => topic.renderTopicName()).join('')
    }
}

