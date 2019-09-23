class Post {
    constructor({
        id,
        type,
        attributes,
        // { content, uplifts }
        relationships
        // {
        //     category: {
        //         // data: {
        //         //     id, type
        //         // }
        //     },
        //     hashtags: {
        //         data: [
        //             // {id, type}
        //         ]
        //     }
        // }
    }) {
        this.id = id
        this.content = attributes.content
        this.uplifts = attributes.uplifts
        this.hashtagIds = relationships.hashtags.data.map(obj => obj.id)
        this.categoryId = relationships.category.data.id
        this.div = document.createElement("div")
        this.div.className = "salt-item"
    }

    getCategory = (postsCategories) => {
        let categoryName = postsCategories.find(catObj => catObj.id === this.categoryId).name
    
        return categoryName;
    }
    
    getHashtags = (postsHashtags) => {
        let hashtags = postsHashtags.filter(tagObj => this.hashtagIds.includes(tagObj.id))
    
        return this.renderTags(hashtags);
    }
    
    renderTags(hashtags){
        return hashtags.map(tagObj => {
            return `<li class="tags" data-tag-id=${tagObj.id}>#${tagObj.tagName}</li>`
        }).join("")
    }

    render(postsCategories, postsHashtags){
        this.div.innerHTML = `
            <h3>${this.getCategory(postsCategories)}</h3>
            <p class="post-content">${this.content}</p>
            ${this.getHashtags(postsHashtags)}</br>
            <button data-post-id=${this.id} class="uplift-btn">&#x2B06;</button><span>${this.uplifts} Uplifts</span>
        `

        return this.div
    }
}