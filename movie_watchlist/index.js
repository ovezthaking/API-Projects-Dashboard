const apiKey = '538738c0'

const fetchSearch = async (value) => {
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${value}`)
        const data = await res.json()

        if (data.Response == 'False') {
            console.log('nie da sie znalezc')
            return 'Unable to find what you’re looking for. Please try another search.'
        }
        else if (data.Response == 'True'){
            console.log(data.Search)
            return data.Search
        }
    } catch (err) {
        console.error('error: ', err)
    }   
}

const fetchDetailed = async (movieArr) => {
    const arr = await fetchSearch(movieArr)
    if (typeof(arr) === 'string'){
        return arr
    }
    const movies = await Promise.all(arr.map(async (movie) => {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=short`)
        const movieData = await res.json()

        console.log('Szczegółowe dane: ' ,movieData)
        return movieData
    }))
    return movies
}

document.addEventListener('submit', async (e) => {
    const content = document.querySelector('.content')
    e.preventDefault()
    document.querySelector('.empty-state').classList.add('unvisible')
    content.classList.remove('unvisible')
    const data = await fetchSearch(document.querySelector('input').value)
    const moviesArray = await fetchDetailed(data)
    console.log(data)
    if (typeof(data) == 'string'){
        content.innerHTML = `<p class='unable-find'>${data}</p>`
    }
    else {
        console.log('Po addevent', moviesArray)
        content.innerHTML = '';
        moviesArray.forEach(movie => {
            // const { Poster, Title, Year}
            content.innerHTML += `
              <div class="results">
                <img src="${movie.Poster}" alt="">
              </div>
            `
        })
    }
})

