let imgUrl = ''
author = ''


const renderBackground = async () => {
    try {
        const res = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
        const data = await res.json()
        imgUrl = await data.urls.full
        console.log(imgUrl)

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
    const coinList = ['bitcoin', 'dogecoin', 'ethereum', 'litecoin']
    for (let coin of coinList){
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`)
            const data = await res.json()
            console.log(data)
        } catch (e) {
            console.error(`Error fetching ${coin} data: `, e)
        }
        finally {

        }
    }
    
}


renderBackground()
renderCrypto()
