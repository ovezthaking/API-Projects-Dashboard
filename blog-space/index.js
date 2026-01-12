const postsContainer = document.getElementById('posts-container')

let postsArray = []


function renderPosts() {
    let html = ''
    postsArray.forEach(post => {
        html += `
            <div id='post'>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
            </div>
        `
    })
    postsContainer.innerHTML = html
}

fetch('https://apis.scrimba.com/jsonplaceholder/posts')
    .then(response => response.json())
    .then(data => {
        postsArray = data.slice(0,5)
        renderPosts()
    })

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
                fetch('https://apis.scrimba.com/jsonplaceholder/posts',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(post)
                })
                    .then(res => res.json())
                    .then(data => {
                        postsArray.unshift(data)
                        renderPosts()
                    })
                
                document.getElementById('post-title').value = ''
                document.getElementById('post-body').value = ''
            }
    }
})


