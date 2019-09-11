function addPostsToDOM(postsCollection) {
    const postsRelatedObj = postsCollection["included"]
    console.log(postsRelatedObj)
}

fetch("https://localhost:3000/posts")
    .then(response => {
        return response.json();
    })
    .then(addPostsToDOM)