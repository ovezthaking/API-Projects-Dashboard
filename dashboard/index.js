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


renderBackground()
renderCrypto()
