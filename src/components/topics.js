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
        this.cardFormBox.addEventListener('submit', this.createCard.bind(this))
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

    renderCards(e) {
        const topicId = e.target.dataset.id 
        this.cardFormBox.innerHTML = this.renderCardForm(topicId)
        this.cardsBox.innerHTML = this.topics.map(topic => topic.flashcards.map(card => {
            if (topicId == card.topic_id) {
                return `
                    <li data-cardid="${card.id}" data-topicid="${topicId}"><b>${card.name}:</b> ${card.description}<button class="delete-btn">Delete</button></li>
                `
            }
        }))   
        const card = document.querySelector( '#cards-container' )
        card.addEventListener('dblclick', this.handleClick.bind(this))
        card.addEventListener('blur', this.updateCard.bind(this))
        card.addEventListener('click', this.handleDelete.bind(this))
    }

    renderCardForm(topicId) {
        return `<form data-topicId="${topicId}" id="card-form">
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
        const id = e.target.dataset.topicid
        const name = document.getElementById( 'card-name' ).value
        const description = document.getElementById( 'card-description' ).value
        this.adapter.createFlashCard(name, description, id)
        .then(card => this.renderNewCard(card))  
        document.getElementById( 'card-name' ).value = ''
        document.getElementById( 'card-description' ).value = ''
    }

    renderNewCard(card) {
        return this.cardsBox.innerHTML += `<li data-cardid="${card.id}"><b>${card.name}</b>: ${card.description}<button class="delete-btn">Delete</button></li>`
    }

    handleClick(e) {
        if(e.target && e.target.nodeName == 'LI')  {
            e.stopPropagation()
            this.editCard(e)
        }
    }
    
    editCard(e) {
        const card = e.target 
        card.contentEditable = true 
        card.focus()
    }

    updateCard(e) {
        const card = e.target
        card.contentEditable = false
        const values = card.innerText
        let [name, description] = values.split(': ')
        const topicId = e.target.dataset.topicid
        const id = e.target.dataset.cardid
        debugger
        this.adapter.updateFlashCard(name, description, topicId, id)
    }

    handleDelete(e) {
        if(e.target && e.target.matches('button.delete-btn')) {
            e.stopPropagation()
            this.deleteCard(e)
        }
    }
    
    deleteCard(e) {
        const id = e.target.parentElement.dataset.cardid
        this.adapter.deleteFlashCard(id)
        e.target.parentElement.remove()
    }

}

