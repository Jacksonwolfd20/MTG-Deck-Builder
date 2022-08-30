
var searchBox = document.querySelector('#search-box');
var searchButton = document.querySelector('#search-button');

var cardDisplay = document.querySelector('#card-display');

var usdButton = document.querySelector('#usd-button');
var eurButton = document.querySelector('#eur-button');
var standardButton = document.querySelector('#standard-button');
var foilButton = document.querySelector('#foil-button');

var cardCost = document.querySelector('#card-cost');
var addButton = document.querySelector('#add-button');

var deckList = document.querySelector('#deck-list');


var deck = [];

/*
function saveDeck() {
    var newDeck = [];
    newDeck = document.getElementById('deck-list');

    console.log(newDeck);

    if (localStorage.getItem('deck') == null) {
        localStorage.setItem('deck', '[]');
    }

    var oldDeck = JSON.parse(localStorage.getItem('deck'));
    oldDeck.push(newDeck);

    localStorage.setItem('deck', JSON.stringify(oldDeck));
}

saveDeck();
*/

searchbtn.addEventListener('click', function() {
    event.preventDefault();
    
    // grabs the user's input from the search box
    var searchInput = searchBox.val().trim();
    console.log(searchInput);

    if (searchInput === '' || searchInput == 'undefined') {
        modal.classList.add('is-active');
        alertMessege.textContent = ("Sorry, the card either couldn't be found or it doesn't exist. Please try again!")
    } else {
        updateDisplay(searchInput)
    }
});

closeButton.addEventListener('click', function () {
    modal.classList.remove('is-active');
});

function updateDisplay() {

};
