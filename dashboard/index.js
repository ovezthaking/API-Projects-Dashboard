const renderBackground = async () => {
    try {
        const res = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
        const data = await res.json()
        const imgUrl = await data.urls.full
        console.log(imgUrl)

        document.body.style.backgroundImage = `url('${imgUrl}')`
        document.getElementById('author').innerText = `By: ${data.user.name}`
    } catch (e) {
        const defaultBgUrl = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        document.body.style.backgroundImage = `url('${defaultBgUrl}')`
    }
    
}


renderBackground()
