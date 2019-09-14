let postsContainer = document.getElementById("salt-container");
let navLinks = document.getElementById("nav-links");
let allPosts = []
    // allPosts is an array of post objects with id references
    // to their related objects (i.e. user, category, hashtags)
let postsRelatives = []
    // postsRelatives is an array of user, category and hashtag objects
    // that are related to the posts stored in allPosts
let postsCategories = []
let postsHashtags = []
let postsUsers = []

function sortPostsNewToOld(postsCollection) {
    return postsCollection.sort((a, b) => {
        let aId = parseInt(a.id, 10);
        let bId = parseInt (b.id, 10);
        if (aId > bId) { return -1 }
        if (bId > aId) { return 1 }
        return 0;
    })
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
        let user = postsUsers.find(obj => obj.id === userId).attributes.username
        let category = postsCategories.find(obj => obj.id === categoryId).attributes.name

        postsContainer.innerHTML += `
            <div class="salt-item">
                <h3>${category}</h3>
                <p class="post-content">${postObj.attributes.content}</p>
                <p>- ${user}</p>
               ${renderTags(tags)}</br>
                <button data-post-id=${postObj.id} class="uplift-btn">&#x2B06;</button><span>${postObj.attributes.uplifts} Uplifts</span>
            </div>
        `
    }
}

function renderTags(tags){
    return tags.map(tagObj => {
        return `<li class="tags" data-tag-id=${tagObj.id}>#${tagObj.attributes.tag_name}</li>`
    }).join("")
}

// function renderTags(tagNamesArray){
//     return tagNamesArray.map(tagName => {
//         return `<li class="tags">${tagName}</li>`
//     }).join("")
// }

fetch("http://localhost:3000/posts")
    .then(response => {
        return response.json();
    })
    .then(res => {
        allPosts = sortPostsNewToOld(res["data"])
        postsRelatives = res["included"]
        postsCategories = postsRelatives.filter(obj => obj.type === "category")
        postsHashtags = postsRelatives.filter(obj => obj.type === "hashtag")
        postsUsers = postsRelatives.filter(obj => obj.type === "user")
        addPostsToDOM(allPosts)
    })

postsContainer.addEventListener('click', (e) => {
    if (e.target.className === "tags"){
        let tagToFilterBy = e.target.dataset.tagId
        filterPosts(tagToFilterBy)

    } else if (e.target.className === "uplift-btn"){
        e.preventDefault();

        let span = e.target.nextSibling
        let postId = e.target.dataset.postId
        let upliftCount = parseInt(span.innerText.split(" ")[0], 10)

        fetch(`http://localhost:3000/posts/${postId}`, {
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

})

function filterPosts(filter) {
    let filteredPosts = allPosts.filter(postObj => {
        // REFACTOR finding a post's hashtags. Used in addPostsToDOM above.
        let relatedObjRefs = postObj.relationships
        let tagIds = relatedObjRefs.hashtags.data.map(obj => obj.id)

        return tagIds.find(id => {
            return id.includes(filter)
        })
    })
    addPostsToDOM(filteredPosts)
}

navLinks.addEventListener("click", (e) => {
    if (e.target.className === "nav-link") {
        let newDivId = e.target.dataset.container;
        let newDiv = document.getElementById(`${newDivId}`);
    }
})