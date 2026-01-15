let deckId
const cardsContainer = document.getElementById('cards')
const scoreHeader = document.getElementById('score')

const handleClick = () => {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => deckId = data.deck_id)
}

const winnerCard = (card1, card2) => {
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", 
        "10", "JACK", "QUEEN", "KING", "ACE"]
    
    const card1Index = values.indexOf(card1.value)
    const card2Index = values.indexOf(card2.value)

    if (card1Index > card2Index) scoreHeader.innerText = 'Computer wins!'
    else if(card2Index > card1Index) scoreHeader.innerText = 'You win!'
    else scoreHeader.innerText = 'War!'
}

const draw = () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => data.cards)
        .then(cards => {
            cardsContainer.children[0].innerHTML = `
                <img src="${cards[0].image}" alt="card 1 image" class="card">
            `
            cardsContainer.children[1].innerHTML = `
                <img src="${cards[1].image}" alt="card 2 image" class="card">
            `
            winnerCard(cards[0], cards[1])
        })
}

document.getElementById('new-deck').addEventListener('click', handleClick)

document.getElementById('draw-cards').addEventListener('click', draw)

handleClick()
setTimeout(draw, 500)
