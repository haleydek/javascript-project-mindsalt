let postsContainer = document.getElementById("home");
let navLinks = document.getElementById("nav-links");
let submitButton = document.getElementsByClassName("submit")[0];
let formFieldsets = document.getElementsByTagName("fieldset");
// let contentInputs = document.getElementsByTagName("textarea");
// let tagInputs = document.getElementsByClassName("new-hashtag");
let allPosts = []
    // allPosts is an array of post objects with id references
    // to their related objects (i.e. category, hashtags)
let postsRelatives = []
    // postsRelatives is an array of category and hashtag objects
    // that are related to the posts stored in allPosts
let postsCategories = []
let postsHashtags = []
let newPosts = []
let newPostsRelatives = []
let newHashtags = []

function sortPostsNewToOld(postsResponse) {
    return postsResponse.sort((a, b) => {
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
        // To obtain the attributes of a post's category, and hashtags,
        // we must match their ids to the corresponding objects in postsRelatedObj.
        let relatedObjRefs = postObj.relationships
        
        postsContainer.innerHTML += `
            <div class="salt-item">
                <h3>${getCategory(relatedObjRefs)}</h3>
                <p class="post-content">${postObj.attributes.content}</p>
               ${getHashtags(relatedObjRefs)}</br>
                <button data-post-id=${postObj.id} class="uplift-btn">&#x2B06;</button><span>${postObj.attributes.uplifts} Uplifts</span>
            </div>
        `
    }
}

function addNewPostsToDOM(postsCollection) {
    for (postObj of postsCollection) {
        // Post object only contains ids of its related objects.
        // To obtain the attributes of a post's category and hashtags,
        // we must match their ids to the corresponding objects in postsRelatedObj.
        let relatedObjRefs = postObj.relationships;

        postsContainer.insertAdjacentElement("afterbegin", `
            <div class="salt-item">
                <h3>${getCategory(relatedObjRefs)}</h3>
                <p class="post-content">${postObj.attributes.content}</p>
               ${getHashtags(relatedObjRefs)}</br>
                <button data-post-id=${postObj.id} class="uplift-btn">&#x2B06;</button><span>${postObj.attributes.uplifts} Uplifts</span>
            </div>
        `)
    }
}

function getCategory(relatedObjRefs){
    let categoryId = relatedObjRefs.category.data.id
    let categoryName = postsCategories.find(obj => obj.id === categoryId).attributes.name

    return categoryName;
}

function getHashtags(relatedObjRefs){
    let hashtagIds = relatedObjRefs.hashtags.data.map(obj => obj.id);
    let hashtags = postsHashtags.filter(obj => hashtagIds.includes(obj.id))

    return renderTags(hashtags);
}

function renderTags(tags){
    return tags.map(tagObj => {
        return `<li class="tags" data-tag-id=${tagObj.id}>#${tagObj.attributes.tag_name}</li>`
    }).join("")
}

fetch("http://localhost:3000/posts")
    .then(response => {
        return response.json();
    })
    .then(res => {
        allPosts = sortPostsNewToOld(res["data"])
        postsRelatives = res["included"]
        postsCategories = postsRelatives.filter(obj => obj.type === "category")
        postsHashtags = postsRelatives.filter(obj => obj.type === "hashtag")
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
        removeActiveClass();

        addActiveClass(event);
    }
})

function removeActiveClass(){
    let currentDiv = document.querySelector("div.active");
    currentDiv.classList.remove("active");
}

function addActiveClass(event){
    let targetId = event.target.getAttribute("href").substr(1);
    let targetDiv = document.getElementById(`${targetId}`);
    targetDiv.classList.add("active");
}

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    let newPosts = [];

    for (fieldset of formFieldsets) {
        let textarea = fieldset.getElementsByTagName("textarea")[0];
        let hashtags = fieldset.getElementsByClassName("new-hashtag");
        let hashtags_attributes = collectTags(hashtags);

        newPosts.push({
            content: textarea.value,
            category_id: fieldset.dataset.categoryId,
            hashtags_attributes
        });
    }

    let newPostsObj = {newPosts};
    console.log(JSON.stringify(newPostsObj));

    // fetch("http://localhost:3000/posts", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Accept": "application/json"
    //     },
    //     body: JSON.stringify(newPostsObj)
    // })
    //     .then(res => res.json())
    //     .then(newPostsResponse => {
    //         newPosts = newPostsResponse["data"]
    //         newPostsRelatives = newPostsResponse["included"]
    //         newHashtags = postsRelatives.filter(obj => obj.type === "hashtag")
    //         addNewPostsToDOM(newPosts)
    //     });

})

function collectTags(hashtags) {
    let tagCollection = []

    for (tag of hashtags) {
        if (tag.value) { tagCollection.push({"tag_name": tag.value}) }
    }

    return tagCollection
}
