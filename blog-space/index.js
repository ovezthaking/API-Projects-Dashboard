const postsContainer = document.getElementById('posts-container')


fetch('https://apis.scrimba.com/jsonplaceholder/posts')
    .then(response => response.json())
    .then(data => {
        data.slice(0,5).forEach(post => {
            postsContainer.innerHTML += `
                <div id='post'>
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <hr />
                </div>
            `
        });
    })
