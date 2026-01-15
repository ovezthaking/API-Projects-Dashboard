let deckId
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const cardsContainer = document.getElementById('cards')
const scoreHeader = document.getElementById('winner-text')
const remainingCards = document.getElementById('remaining-cards')
const computerScoreText = document.getElementById('computer-score')
const playerScoreText = document.getElementById('player-score')

let computerScore = 0
let playerScore = 0
let finished = false

const handleClick = async () => {
    const res = await fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    const data = await res.json()
        
    remainingCards.innerText = `Remaining cards: ${data.remaining}`
    deckId = data.deck_id
       
    computerScore = 0
    playerScore = 0
    computerScoreText.textContent = `Computer score: ${computerScore}`
    playerScoreText.textContent = `My score: ${playerScore}`
    finished = false
    scoreHeader.innerText = 'Game of War'
    drawCardBtn.disabled = false
}

const winnerCard = (card1, card2) => {
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", 
        "10", "JACK", "QUEEN", "KING", "ACE"]
    
    const card1Index = values.indexOf(card1.value)
    const card2Index = values.indexOf(card2.value)

    if (card1Index > card2Index) {
        scoreHeader.innerText = 'Computer wins!'
        computerScore ++
        computerScoreText.textContent = `Computer score: ${computerScore}`
    }
    else if(card2Index > card1Index) {
        scoreHeader.innerText = 'You win!'
        playerScore++
        playerScoreText.textContent = `My score: ${playerScore}`
    }
    else scoreHeader.innerText = 'War!'
}

const draw = async () => {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()

    remainingCards.innerText = `Remaining cards: ${data.remaining}`
    if (data.remaining <= 0){
        drawCardBtn.disabled = true
        finished = true
        if (computerScore > playerScore){
            scoreHeader.innerText = 'Computer wins the entire game!!!'
        }
        else {
            scoreHeader.innerText = 'You win the entire game!!!'
        }
    }
        
    const cards = data.cards
    
    cardsContainer.children[0].innerHTML = `
        <img src="${cards[0].image}" alt="card 1 image" class="card">
    `
    cardsContainer.children[1].innerHTML = `
        <img src="${cards[1].image}" alt="card 2 image" class="card">
    `
    if (!finished){
        winnerCard(cards[0], cards[1])
    }
}

newDeckBtn.addEventListener('click', handleClick)

document.getElementById('draw-cards').addEventListener('click', draw)

handleClick()
// setTimeout(draw, 500)
