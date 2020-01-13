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
                'content-type': 'application/json'
            },
            body: JSON.stringify({topic})
        })
        .then(res => res.json())
    }
}


