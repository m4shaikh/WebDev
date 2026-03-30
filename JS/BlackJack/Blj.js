let currentSum = 0;
const startEl = document.getElementById("cards");
const drawButton = document.getElementById("draw");
const messageEl = document.getElementById("message");


function generator(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateGameStatus() {
    if (currentSum > 21) {
        drawButton.hidden = true;
        
        return "Game Over";
    } else if (currentSum < 21) {
        drawButton.hidden = false;
        return "Do you want to draw another card?";
    } else {
        drawButton.hidden = true;
        return "You've got blackjack!";
    }
}

function startGame() {
    let firstCard = generator(2, 11);
    let secondCard = generator(2, 11);
    
    currentSum = firstCard + secondCard;
    
    startEl.innerText = 'Cards Drawn : ' + `${firstCard} ${secondCard}`;
    messageEl.innerText = updateGameStatus();
}

function drawCard() {
    let newCard = generator(2, 11);
    currentSum += newCard;
    
    startEl.innerText += ' ' + `${newCard}`;
    messageEl.innerText = updateGameStatus();
}
