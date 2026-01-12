const postsContainer = document.getElementById('posts-container')


fetch('https://apis.scrimba.com/jsonplaceholder/posts')
    .then(response => response.json())
    .then(data => {
        data.slice(0,5).forEach(post => {
            postsContainer.innerHTML += `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            `
        });
    })
