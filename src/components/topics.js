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
        // this.topicsBox.addEventListener('dblclick', this.editTopic.bind(this))
        this.topicsBox.addEventListener('blur', this.updateTopic.bind(this), true) // look into `true`
        this.topicsBox.addEventListener('click', e => {
            if (e.target.className === 'far fa-edit') {
                this.editTopic()
            }
        })
    }

    createTopic(e) {
        e.preventDefault()
        const name = this.topicName.value

        this.adapter.create(name)
        .then(topic => {
            this.topics.push(new Topic(topic))
            this.topicName.value = ''
            this.renderTopics()
        })
    }

    editTopic(e) {
        const topic = e.target //fix this ******************************************************************************************
        topic.contentEditable = true 
        topic.focus()
        topic.classList.add( 'edit' )
    }

    updateTopic(e) {
        const topic = e.target
        topic.contentEditable = false 
        topic.classList.remove( 'edit' )
        const newName = topic.innerHTML
        const id = topic.dataset.id 
        this.adapter.update(newName, id)
    }

    deleteTopic(e) {
        console.log('oh noooooooo')
    }

    renderTopics() {
        this.topicsBox.innerHTML = this.topics.map(topic => topic.renderTopicName()).join('')
    }
}

