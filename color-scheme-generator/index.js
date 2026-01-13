const main = document.querySelector('main')

function fetchApi(hexValue){
    const mode = document.getElementById('color-mode').value
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${mode}`)
        .then(res => res.json())
        .then(data => {
            data.colors.forEach(color => {
                console.log(color.hex.value)
                const container = document.createElement('div')
                container.classList.add('color-container')
                const div = document.createElement('div')
                div.style.backgroundColor = `${color.hex.value}`
                div.style.height = '100%'
                const btn = document.createElement('button')
                btn.textContent = color.hex.value
                btn.addEventListener('click', () => {
                    navigator.clipboard.writeText(color.hex.value)
                    btn.textContent = 'Copied!'
                    setTimeout(() => {
                        btn.textContent = color.hex.value
                    }, 1000)
                })
                main.append(container)
                container.append(div)
                container.append(btn)
            })
        })
}

function render() {
    fetchApi('000000')
}

document.addEventListener('submit', (e) => {
    e.preventDefault()
    main.innerHTML = ''
    const hexValue = document.getElementById('pick-color').value.slice(1)
    fetchApi(hexValue)
})

render()
