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
            topics.forEach(topic => this.topics.push(new Topic (topic) ))
        })
        .then( () => this.renderTopics() )
    }

    domElements() {
        this.topicsBox = document.getElementById( 'topics-container' )
        this.topicForm = document.getElementById( 'topic-form' )
        this.topicNameField = document.getElementById( 'topic-name' )
        this.cardFormBox = document.getElementById( 'card-form-box' )
        this.cardsBox = document.querySelector( '.bottom' )
    }
    
    initListeners() {
        this.topicForm.addEventListener('submit', this.createTopic.bind(this))
        this.topicsBox.addEventListener('dblclick', this.editTopic.bind(this))
        this.topicsBox.addEventListener('blur', this.updateTopic.bind(this), true) // look into `true`
        this.cardFormBox.addEventListener('submit', this.createCard.bind(this))
        this.cardsBox.addEventListener('click', this.handleAnswer.bind(this))
    }

    //  TOPICS *********************************************************************
    
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
        this.topicName = document.querySelectorAll("#topic-list")
        this.topicName.forEach( name => {
            name.addEventListener('click', this.findTopic.bind(this))
        })
    }

    // FLASHCARDS *******************************************************************************
   
    findTopic(e) {
        const topicId = e.target.dataset.id 
        const topicName = e.target.textContent 
        this.cardFormBox.innerHTML = this.renderCardForm(topicId, topicName)
        // find the right topic so that we can pass it to a function.
        // That function will return the list of cards that belong to that topic.
        const topic = this.topics.find( topic => topic.id === parseInt(topicId) )
        this.renderCards(topic)
    }

    renderCards(topic) {
        const cards = topic.flashcards.map( card => {
            if ( topic.id === card.topic_id ) {
                return `<div class="card-list"
                        data-cardid="${card.id}" 
                        data-topicid="${card.topic_id}">
                        <button class="show-btn">Answer</button>
                        <h4 class="flashcard-name">${card.name}</h4>
                        <p class="flashcard-description">${card.description}</p>
                        <button class="delete-btn">Delete</button>
                        </div>
                        `
            }
        })
        this.cardsBox.innerHTML = cards.join('')
        const deleteBtn = document.querySelector(".bottom")
        deleteBtn.addEventListener('click', this.handleDelete.bind(this))
    }

    renderCardForm(topicId, topicName) {
        return `<form data-topicId="${topicId}" id="card-form">
        <label for="card-name" id="card-label">Create a Flashcard for ${topicName}</label>
        <input type="text" id="card-name" placeholder="Name your flashcard" required>
        <textarea type="text" id="card-description" placeholder="Description" required></textarea>
        <input type="submit" value="Create">
        </form>
        `
    }
    
    createCard = e => {
        e.preventDefault()
        this.topicId = parseInt(e.target.dataset.topicid)
        const name = document.getElementById( 'card-name' ).value
        const description = document.getElementById( 'card-description' ).value
        this.adapter.createFlashCard(name, description, this.topicId)
        .then(card => {
            this.topics.find( topic => topic.id === this.topicId).flashcards.push(card)
            this.renderNewCard(card)
        })
        document.getElementById( 'card-name' ).value = ''
        document.getElementById( 'card-description' ).value = ''
    }
    
    renderNewCard(card) {
        return this.cardsBox.innerHTML += 
            `<div class="card-list" 
            data-cardid="${card.id}"
            data-topicid="${card.topic_id}">
            <button class="show-btn">Answer</button>
            <h4 class="flashcard-name">${card.name}</h4>
            <p class="flashcard-description">${card.description}</p>
            <button class="delete-btn">Delete</button>
            </div>`
    }
    
    handleDelete(e) {
        if(e.target && e.target.matches('button.delete-btn')) {
            this.deleteCard(e)
            e.stopPropagation()
        }
    }
    
    deleteCard(e) {
        this.cardId = parseInt(e.target.parentElement.dataset.cardid)
        this.adapter.deleteFlashCard(this.cardId)
        const topicId = parseInt(e.target.parentElement.dataset.topicid)
        const topic = this.topics.find((topic) => topic.id === topicId)
        e.target.parentElement.remove()
        topic.flashcards = topic.flashcards.filter( card => card.id !== this.cardId)
    }

    handleAnswer(e) {
        if(e.target && e.target.matches('button.show-btn')) {
            this.toggle(e)
            e.stopPropagation()
        }
    }

    toggle(e) {
        const desc = e.target.parentElement.children[2]
        // desc.style.display = desc.style.display === 'none' ? 'block' : 'none'
        
        // Work around so that click event works first time
        if ( desc.style.display == 'none' || desc.style.display == '' ) {
            desc.style.display = 'block'
        } else {
            desc.style.display = 'none'
        }
    }
}






































































//Inside of renderCards()
// card.addEventListener('dblclick', this.handleClick.bind(this))
// card.addEventListener('blur', this.updateCard.bind(this))  Update not working 



// handleClick(e) {
//     if(e.target && e.target.nodeName == 'LI')  {
//         e.stopPropagation()
//         this.editCard(e)
//     }
// }

// editCard(e) {
//     const card = e.target 
//     card.contentEditable = true 
//     card.focus()
// }

// updateCard(e) {
//     const card = e.target
//     card.contentEditable = false
//     const values = card.innerText
//     let [name, description] = values.split(': ')
//     const topicId = e.target.dataset.topicid
//     const id = e.target.dataset.cardid
//     debugger
//     this.adapter.updateFlashCard(name, description, topicId, id)
// }s