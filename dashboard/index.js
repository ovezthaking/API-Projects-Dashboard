const renderBackground = async () => {
    let imgUrl = ''
    let author = ''

    try {
        const res = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
        const data = await res.json()
        imgUrl = await data.urls.full

        author = data.user.name
    } catch (e) {
        imgUrl = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        author = 'Benjamin Voros'
        console.error('Error fetching background data: ', e)
    }
    finally {
        document.body.style.backgroundImage = `url('${imgUrl}')`
        document.getElementById('author').textContent = `By: ${author}`
    }
}


const renderCrypto = async () => {
    let resultTop = ''
    let resultBottom = ''

    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/dogecoin`)
        const data = await res.json()
        
        resultTop = `
            <img src=${data.image.small} />
            <span> ${data.name} </span>
        `

        resultBottom = `
            <p>🎯: ${data.market_data.current_price.pln} PLN</p>
            <p>👆: ${data.market_data.high_24h.pln} PLN</p>
            <p>👇: ${data.market_data.low_24h.pln} PLN</p>
        `

    } catch (e) {
        console.error(`Error fetching coin data: `, e)
    }
    finally {
        document.getElementById('crypto-top').innerHTML += resultTop
        document.getElementById('crypto').innerHTML += resultBottom
    }
}


const renderTime = () => {
    const date = new Date();
    const time = date.toLocaleTimeString("en-us", {timeStyle: "short"})

    document.querySelector('.time').textContent = time
}


navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather/?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error('Weather data not available!')
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById('weather').innerHTML = `
                <img src='${iconUrl}' alt ='Weather icon' />
                <p class="weather-temp"> ${Math.round(data.main.temp)}°C</p>
                <p class="weather-city"> ${data.name} </p>
            `
        })
        .catch(e => console.error('Error getting weather data: ', e))
})


renderBackground()
renderCrypto()
setInterval(renderTime, 1000);
