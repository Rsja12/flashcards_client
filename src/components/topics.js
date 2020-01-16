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
        this.topicNameField = document.getElementById( 'topic-name' )
        this.cardsBox = document.getElementById( 'cards-container' )
    }

    initListeners() {
        this.topicForm.addEventListener('submit', this.createTopic.bind(this))
        this.topicsBox.addEventListener('dblclick', this.editTopic.bind(this))
        this.topicsBox.addEventListener('blur', this.updateTopic.bind(this), true) // look into `true`
        this.topicsBox.addEventListener('click', this.renderCards.bind(this))
        this.topicsBox.addEventListener('click', this.renderCards.bind(this))
    }

    createTopic(e) {
        e.preventDefault()
        const name = this.topicNameField.value

        this.adapter.create(name)
        .then(topic => {
            this.topics.push(new Topic(topic))
            this.topicNameField.value = ''
            this.renderTopics()
        })
    }

    editTopic(e) {
        const topic = e.target
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

    renderTopics() {
        this.topicsBox.innerHTML = this.topics.map(topic => topic.renderTopicName()).join('')
    }

    renderCards(e)  {
        const id = e.target.dataset.id 
        this.cardsBox.innerHTML = this.renderCardForm()
        this.topics.map(topic => topic.flashcards.map(card => {
            if (parseInt(id) === card.topic_id) {
                return `
                <li>${card.name}</li>
                `
            }
        })
    )}

    renderCardForm() {
        return `
        <form id="card-form">
            <label for="card-name">
                Create a new flashcard!
            </label><br>
            Concept: <input type="text" id="card-name" required><br>
            Description: <textarea type="text" id="card-description" required></textarea>
            <input type="submit" value="Create">
        </form>
        `
    }
        
}

