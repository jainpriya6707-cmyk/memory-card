var images = [
    " images/smile1.jpg",
    "images/laughing2.png",
    "images/bestoffluck3.jpg",
    "images/cry4.png",
    "images/eyeclose5.jpg",
    "images/loves6.jpg",
    "images/blush7.jpg",
    "images/moodoff8.jpg",
];

var firstCard = null;
var secondCard = null;
var canFlip = true;
var matches = 0;
var moves = 0;
var seconds = 0;
var timerRunning = false;
var timerInterval;

// Start the game
function startGame() {
    var gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    // Create pairs of cards
    var cardImages = images.concat(images);

    // Shuffle cards
    cardImages.sort(function() {
        return Math.random() - 0.5;
    });

    // Create card elements
    for (var i = 0; i < cardImages.length; i++) {
        var card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = '<div class="card-front"><i class="fas fa-heart"></i></div>' +
            '<div class="card-back"><img src="' + cardImages[i] + '"></div>';
        card.onclick = flipCard;
        card.dataset.image = cardImages[i];
        gameBoard.appendChild(card);
    }

    // Reset variables
    firstCard = null;
    secondCard = null;
    canFlip = true;
    matches = 0;
    moves = 0;
    seconds = 0;
    timerRunning = false;

    updateStats();
    clearInterval(timerInterval);
}

function flipCard() {
    if (!canFlip) return;
    if (this.classList.contains('flipped')) return;
    if (this.classList.contains('matched')) return;

    // Start timer on first click
    if (!timerRunning) {
        startTimer();
    }

    this.classList.add('flipped');

    if (firstCard == null) {
        firstCard = this;
    } else {
        secondCard = this;
        canFlip = false;
        moves++;
        updateStats();
        checkMatch();
    }
}

function checkMatch() {
    var match = firstCard.dataset.image == secondCard.dataset.image;

    if (match) {
        setTimeout(function() {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matches++;
            updateStats();
            resetCards();

            if (matches == 8) {
                endGame();
            }
        }, 500);
    } else {
        setTimeout(function() {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    canFlip = true;
}

function startTimer() {
    timerRunning = true;
    timerInterval = setInterval(function() {
        seconds++;
        updateStats();
    }, 1000);
}

function updateStats() {
    document.getElementById('moves').textContent = moves;
    document.getElementById('matches').textContent = matches + '/8';

    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;
    if (secs < 10) secs = '0' + secs;
    document.getElementById('time').textContent = mins + ':' + secs;
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById('finalMoves').textContent = moves;
    document.getElementById('finalTime').textContent = document.getElementById('time').textContent;
    document.getElementById('winModal').classList.add('show');
}

function newGame() {
    document.getElementById('winModal').classList.remove('show');
    clearInterval(timerInterval);
    startGame();
}

// Start the game when page loads
startGame();

function buttonEffect(btn) {
    btn.classList.add("clicked");

    setTimeout(function() {
        btn.classList.remove("clicked");
    }, 300);
}