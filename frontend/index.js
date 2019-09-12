let posts = document.getElementById("salt-container");

function addPostsToDOM(postsCollection) {
    const postsObjects = postsCollection["data"]
    const postsRelatedObj = postsCollection["included"]
    // postsRelatedObj is array of user, category and hashtag objects
    // that are related to the posts in postsCollection

    for (postObj of postsObjects) {
        posts.innerHTML += `
            <div class="salt-item">
                <p class="post-content">${postObj.attributes.content}</p>
                <p><button data-post-id=${postObj.id} class="uplift-btn">&#x21E7;</button> ${postObj.attributes.uplifts} Uplifts</p>
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