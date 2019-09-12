let postsContainer = document.getElementById("salt-container");
let allPosts = []
    // allPosts is an array of post objects with id references
    // to their related objects (i.e. user, category, hashtags)
let postsRelatives = []
    // postsRelatives is an array of user, category and hashtag objects
    // that are related to the posts stored in allPosts
let postsCategories = []
let postsHashtags = []
let postsUsers = []

postsContainer.addEventListener('click', (e) => {
    if (e.target.className = "tag"){
        let tagToFilterBy = e.target.innerText
        //innerText will be like the name of the tag that you want to filter 
        filterPosts(tagToFilterBy)
    }

})

function filterPosts(filter) {
    let filteredPosts = allPosts.filter(post => {
        return post.hashtags.find(hashtag => {
            return hashtag.tag_name.includes("filter")
        })
    })
    addPostsToDOM(filteredPosts)
}

function addPostsToDOM(postsCollection) {
    // Clear innerHTML every time function is called. Otherwise, duplication will occur.
    postsContainer.innerHTML = ``
    
    for (postObj of postsCollection) {
        // Post object only contains ids of its related objects.
        // To obtain the attributes of a post's user, category, and hashtags,
        // we must match their ids to the corresponding objects in postsRelatedObj.
        let relatedObjRefs = postObj.relationships

        let hashtagIds = relatedObjRefs.hashtags.data.map(obj => obj.id)
        let userId = relatedObjRefs.user.data.id
        let categoryId = relatedObjRefs.category.data.id

        let tags = postsHashtags.filter(obj => hashtagIds.includes(obj.id))
        let tagNames = tags.map(obj => obj.attributes.tag_name)
        let user = postsUsers.find(obj => obj.id === userId).attributes.username
        let category = postsCategories.find(obj => obj.id === categoryId).attributes.name

        postsContainer.innerHTML += `
            <div class="salt-item">
                <h3>${category}</h3>
                <p class="post-content">${postObj.attributes.content}</p>
                <p class="post-user">- ${user}</p>
               ${renderTags(tagNames)}
                <p><button data-post-id=${postObj.id} class="uplift-btn">&#x2B06;</button> ${postObj.attributes.uplifts} Uplifts</p>
            </div>
        `
    }
}

function renderTags(tagNamesArray){
    return tagNamesArray.map(tagName => {
        return `<li class="tags">${tagName}</li>`
    }).join("")
}

fetch("http://localhost:3000/posts")
    .then(response => {
        return response.json();
    })
    .then(res => {
        allPosts = res["data"]
        postsRelatives = res["included"]
        postsCategories = postsRelatives.filter(obj => obj.type === "category")
        postsHashtags = postsRelatives.filter(obj => obj.type === "hashtag")
        postsUsers = postsRelatives.filter(obj => obj.type === "user")
        addPostsToDOM(allPosts)
    })
