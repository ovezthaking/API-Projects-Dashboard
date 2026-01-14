let deckId

const handleClick = () => {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => deckId = data.deck_id)
}

const draw = () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => data.cards)
        .then(cards => {
            console.log(cards[0])
            console.log(cards[1])
            document.getElementById('cards').innerHTML = `
                <img src="${cards[0].image}" alt="card 1 image">
                <img src="${cards[1].image}" alt="card 2 image">
            `
        })
}

document.getElementById('new-deck').addEventListener('click', handleClick)

document.getElementById('draw-cards').addEventListener('click', draw)

handleClick()
