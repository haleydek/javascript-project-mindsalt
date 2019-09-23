class Adapter {
    constructor(baseURL){
        this.baseURL = baseURL
        this.postsContainer = document.getElementById("home");
        this.navLinks = document.getElementById("nav-links");
        this.newForm = document.getElementsByClassName("new-form")[0];
        this.submitButton = document.getElementsByClassName("submit")[0];
        this.formFieldsets = document.getElementsByTagName("fieldset");
        this.allPosts = []
        this.postsRelatives = []
        this.postsCategories = []
        this.postsHashtags = []

        this.postsContainer.addEventListener("click", this.filterOrUplift)
        this.navLinks.addEventListener("click", this.toggleActiveLink)
        // this.submitButton.addEventListener("click")
    }

    fetchPosts() {
        fetch(this.baseURL)
        .then(res => res.json())
        .then(dataObj => {
            dataObj["included"].forEach(obj => {
                if (obj.type === "category" && !this.postsCategories.find(cat => cat["id"] === obj.id)) {
                    let newCategory = new Category(obj)
                    this.postsCategories.push(newCategory)
                } else if (obj.type === "hashtag" && !this.postsHashtags.find(tag => tag["id"] === obj.id)) {
                    let newTag = new Hashtag(obj)
                    this.postsHashtags.push(newTag)
                }
            })

            console.log("categories: " + this.postsCategories)
            console.log("hashtags: " + this.postsHashtags)

            dataObj["data"].forEach(postObj => {
                let newPost = new Post(postObj)
                this.allPosts.push(newPost)
            })

            console.log("posts: " + this.allPosts)

            this.addPostsToDOM(this.allPosts)
        })
    }

    filterOrUplift = (e) => {
        if (e.target.className === "tags"){
            let tagId = parseInt(e.target.dataset.tagId, 10);
            this.filterPosts(tagId)
    
        } else if (e.target.className === "uplift-btn"){
            e.preventDefault();
    
            let span = e.target.nextSibling
            let postId = e.target.dataset.postId
            let upliftCount = parseInt(span.innerText.split(" ")[0], 10)
    
            fetch(`${this.baseURL}/${postId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "uplifts": upliftCount + 1
                })
            })
                .then(response => {
                    return response.json();
                })
                .then(postObj => {
                    span.innerText = `${postObj.uplifts} Uplifts`
                })
        }
    }

    filterPosts(filter) {
        let filteredPosts = this.allPosts.filter(postObj => {

            if (postObj.hashtagIds.find(id => parseInt(id, 10) === filter)) {
                return postObj
            }
        })
    
        this.addPostsToDOM(filteredPosts)
    }

    sortPostsNewToOld(postsArray) {
        return postsArray.sort((a, b) => {
            let aId = parseInt(a.id, 10);
            let bId = parseInt (b.id, 10);
            if (aId > bId) { return -1 }
            if (bId > aId) { return 1 }
            return 0;
        })
    }

    addPostsToDOM = (postsArray) => {
        // Clear innerHTML every time function is called. Otherwise, duplication will occur.
        this.postsContainer.innerHTML = ``
    
        let sortedPosts = this.sortPostsNewToOld(postsArray);
        
        sortedPosts.forEach(postObj => {
            this.postsContainer.appendChild(postObj.render(this.postsCategories, this.postsHashtags))
        })
    }

    toggleActiveLink = (e) => {
        if (e.target.className === "nav-link") {
            this.removeActiveClass();
    
            this.addActiveClass(e);
        }
    }
    
    removeActiveClass(){
        let currentDiv = document.querySelector("div.active");
        currentDiv.classList.remove("active");
    }
    
    addActiveClass(e){
        let targetId = e.target.getAttribute("href").substr(1);
        let targetDiv = document.getElementById(`${targetId}`);
        targetDiv.classList.add("active");
    }
}

let app = new Adapter("http://localhost:3000/posts")
app.fetchPosts()