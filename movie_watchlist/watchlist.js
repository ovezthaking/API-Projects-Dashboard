let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

const render = () => {
    const content = document.querySelector('.content')
    document.querySelector('.empty-state').classList.add('unvisible')
    content.classList.remove('unvisible')
    // const data = await fetchSearch(document.querySelector('input').value)
    console.log(watchlist)
    if (typeof(data) == 'string'){
        content.innerHTML = `<p class='unable-find'>${data}</p>`
    }
    else {
        content.innerHTML = ''
        
        watchlist.forEach(movie => {
            const { Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID } = movie
            content.innerHTML += `
              <div class="results">
                <img src="${Poster}" alt="${Title} poster">
                <div>
                    <div class="movie-header">
                        <h2>${Title}</h2>
                        <p>⭐${imdbRating}</p>
                    </div>
                    <div class="movie-subheader">
                        <p>${Runtime}</p>
                        <p>${Genre}</p>
                        
                        <button class="toggle-btn" data-imdb-id="${imdbID}">
                            ${watchlist.find(movie => movie.imdbID === imdbID) ? '<img src="img/remove.png" alt="Toggle watchlist icon">' : '<img src="img/add.png" alt="Toggle watchlist icon">' }
                            Watchlist 
                        </button>
                    </div>
                    <div class="movie-plot">
                        <p> ${Plot} </p>
                    </div>
                </div>
              </div>
              
            `
        })
    }
}


const toggleWatchList = async (id) => {
    const btn = document.querySelector(`[data-imdb-id="${id}"]`)

    if (watchlist.find(movie => movie.imdbID === id)){
        watchlist = watchlist.filter(movie => movie.imdbID !== id)
        render()
    }

    localStorage.setItem('watchlist', JSON.stringify(watchlist))
}


document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('[data-imdb-id]')
    if (!toggleBtn) return

    const { imdbId } = toggleBtn.dataset
    toggleWatchList(imdbId)
})

render()