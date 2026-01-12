const postsContainer = document.getElementById('posts-container')
const titleInput = document.getElementById('post-title')
const bodyInput = document.getElementById('post-body')

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
            titleInput.value &&
            bodyInput.value) {
                const post = {
                    title: titleInput.value,
                    body: bodyInput.value
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
                        titleInput.value = ''
                        bodyInput.value = ''
                    })
            }
    }
})


