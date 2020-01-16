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
        this.cardFormBox = document.getElementById( 'card-form-box' )
        this.cardsBox = document.getElementById( 'cards-container' )

    }

    initListeners() {
        this.topicForm.addEventListener('submit', this.createTopic.bind(this))
        this.topicsBox.addEventListener('dblclick', this.editTopic.bind(this))
        this.topicsBox.addEventListener('blur', this.updateTopic.bind(this), true) // look into `true`
        this.topicsBox.addEventListener('click', this.renderCards.bind(this))
        // this.cardForm.addEventListener('submit', this.createCard.bind(this))
    }

    // TOPICS *********************************************************************

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
        const name = topic.innerHTML
        const id = topic.dataset.id 
        this.adapter.update(name, id)
    }

    renderTopics() {
        this.topicsBox.innerHTML = this.topics.map(topic => topic.renderTopicName()).join('')
    }

    // FLASHCARDS ********************************************************************************

    renderCards(e)  {
        const id = e.target.dataset.id 
        this.cardFormBox.innerHTML = this.renderCardForm()
        this.cardsBox.innerHTML = this.topics.map(topic => topic.flashcards.map(card => {
            if (id == card.topic_id) {
                return `
                    <li><b>${card.name}:</b> ${card.description}</li>
                `
            }
        }))   
    }

    renderCardForm() {
        return `<form id="card-form">
            <label for="card-name">
                Create a new flashcard!
            </label><br>
            Concept: <input type="text" id="card-name" required><br>
            Description: <textarea type="text" id="card-description" required></textarea>
            <input type="submit" value="Create">
        </form>
        `
    }

    createCard(e) {
        e.preventDefault()
        const name = document.getElementById( 'card-name' ).value
        debugger
        const description = document.getElementById( 'card-description' )
        const id = e.target.dataset.id 
        console.log(name, description, id)

        // this.adapter.createFlashCard(name, description, id)
        // .then(card => {
        //     console.log(card.name)
        // })
    }
        
}

