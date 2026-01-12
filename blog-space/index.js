const postsContainer = document.getElementById('posts-container')


document.addEventListener('submit', (e) => {
    e.preventDefault()
    if (e.target.id == document.querySelector('button').id){
        if (
            document.getElementById('post-title').value &&
            document.getElementById('post-body').value) {
                const post = {
                    title: document.getElementById('post-title').value,
                    body: document.getElementById('post-body').value
                }
                console.log(post)
            }
    }
})

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
