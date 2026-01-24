const renderBackground = async () => {
    const res = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    const data = await res.json()
    const imgUrl = await data.urls.full

    document.body.style.backgroundImage = `url('${imgUrl}')`
    document.getElementById('author').innerText = `By: ${data.user.name}`
}


renderBackground()
