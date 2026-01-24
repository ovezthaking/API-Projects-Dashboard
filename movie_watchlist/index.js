const apiKey = '538738c0'
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

const fetchSearch = async (value) => {
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${value}`)
        const data = await res.json()

        if (data.Response == 'False') {
            return 'Unable to find what you’re looking for. Please try another search.'
        }
        else if (data.Response == 'True'){
            const moviesArray = []

            for (movie of data.Search){
                const detailedRes = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=short`)
                const moviesData = await detailedRes.json()
                moviesArray.push(moviesData)
            }

            return moviesArray
        }
    } catch (err) {
        console.error('error: ', err)
    }   
}


const toggleWatchList = async (id) => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=short`)
    const moviesData = await res.json()
    const btn = document.querySelector(`[data-imdb-id="${id}"]`)

    if (watchlist.find(movie => movie.imdbID === id)){
        watchlist = watchlist.filter(movie => movie.imdbID !== id)
        btn.innerHTML = '<img src="img/add.png" alt="Toggle watchlist icon"> Watchlist'
    } 
    else {
        watchlist.push(moviesData)
        btn.innerHTML = '<img src="img/remove.png" alt="Toggle watchlist icon"> Watchlist'
    }
    
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
}



document.addEventListener('submit', async (e) => {
    const content = document.querySelector('.content')
    e.preventDefault()
    document.querySelector('.empty-state').classList.add('unvisible')
    content.classList.remove('unvisible')
    const data = await fetchSearch(document.querySelector('input').value)
    
    if (typeof(data) == 'string'){
        content.innerHTML = `<p class='unable-find'>${data}</p>`
    }
    else {
        content.innerHTML = ''
        console.log(data)
        data.forEach(movie => {
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
})

document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('[data-imdb-id]')
    if (!toggleBtn) return

    const { imdbId } = toggleBtn.dataset
    toggleWatchList(imdbId)
})
