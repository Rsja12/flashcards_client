class TopicsAdapter {
    constructor() {
        this.baseURL = 'http://localhost:3000/topics'
    }

    getTopics() {
        return fetch(this.baseURL)
        .then(res => res.json())
    }

    create(name) {
        const topic = {
            name: name 
        }
        return fetch(this.baseURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(topic) 
        })
        .then(res => res.json())
    }

    update(name, id) {
        const topic = {
            name: name,
        }
        return fetch(`${this.baseURL}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(topic)
        })
        .then(res => res.json())
    }

    // FLASHCARDS

    createFlashCard(name, description, id) {
        const flashcard = {
            name: name,
            description: description
        }
        return fetch(`${this.baseURL}/${id}/flashcards`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({flashcard})
        })
        .then(res => res.json())
    }


    deleteFlashCard(id) {
        return fetch(`http://localhost:3000/flashcards/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        
    }

}



























// updateFlashCard(name, description, topicId, id) {
//     const flashcard = {
//         name: name,
//         description: description,
//     }
//     return fetch(`${this.baseURL}/${topicId}/flashcards/${id}`, {
//         method: 'PATCH',
//         headers: {
//             'content-type': 'application/json',
//         },
//         body: JSON.stringify({flashcard})
//     })
//     .then(res => res.json())
// }