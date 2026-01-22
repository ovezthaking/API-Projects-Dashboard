const apiKey = '538738c0'

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
                const detailedRes = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=short`)
                const moviesData = await detailedRes.json()
                moviesArray.push(moviesData)
            }

            return moviesArray
        }
    } catch (err) {
        console.error('error: ', err)
    }   
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

        data.forEach(movie => {
            const { Poster, Title, imdbRating, Runtime, Genre, Plot } = movie
            content.innerHTML += `
              <div class="results">
                <img src="${Poster}" alt="">
                <div>
                    <div class="movie-header">
                        <h2>${Title}</h2>
                        <p>⭐${imdbRating}</p>
                    </div>
                    <div class="movie-subheader">
                        <p>${Runtime}</p>
                        <p>${Genre}</p>
                        <a href="">+ Watchlist </a>
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

