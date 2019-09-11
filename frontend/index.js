let posts = document.getElementById("salt-index");

function addPostsToDOM(postsCollection) {
    const postsObjects = postsCollection["data"]
    const postsRelatedObj = postsCollection["included"]
    // postsRelatedObj is array of user, category and hashtag objects
    // that are related to the posts in postsCollection

    for (postObj of postsObjects) {
        posts.innerHTML += `
            <div class="post-container">
                <p class="post-content">${postObj.attributes.content}</p>
                <p>${postObj.attributes.uplifts} Uplifts</p>
                <button data-post-id=${postObj.id} class="uplift-btn">Uplift</button>
            </div>
        `
    }

    for (relatedObj of postsRelatedObj) {
        // const hashtagCollection = []
        // const userCollection = []
        // const categoryCollection = []

        // relatedObj.type === "category" ? 
    }
}

fetch("http://localhost:3000/posts")
    .then(response => {
        return response.json();
    })
    .then(addPostsToDOM)