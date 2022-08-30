var searchBox = document.querySelector('#search-box');
var searchBtn = document.querySelector('#search-button');
var searchBar = document.querySelector('#search-bar');

var cardDisplay = document.querySelector('#card-display');

var usdBtn = document.querySelector('#usd-button');
var eurBtn = document.querySelector('#eur-button');
var standardBtn = document.querySelector('#standard-button');
var foilBtn = document.querySelector('#foil-button');

var cardCost = document.querySelector('#card-cost');
var addBtn = document.querySelector('#add-button');

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

// search function triggered by clicking the search button
searchBtn.addEventListener('click', function() {
    event.preventDefault();
    responseEl.remove();

    // grabs the user's input from the search box
    var searchInput = searchBar.val().trim();
    console.log(searchInput);
    
    // checks for a valid input
    if (searchInput === '' || searchInput == 'undefined') {
        console.log('No results found');
        var responseEl = document.createElement('p');
        responseEl.textContent = "Sorry, the card either couldn't be found or it doesn't exist. Please try again!"
        searchBox.append(responseEl);
    } else {
        updateDisplay(searchInput);
    }
});


// checks for user input and returns card image to the page
function updateDisplay(searchInput) {
    //Stores The URL
    var cardId = encodeURI(`https://api.scryfall.com/cards/named?fuzzy=${searchInput}`);

    fetch(cardId, {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
        cache: 'reload'
    }) .then (response => {
        return response.json();
    }) .then (data => {
        var cardArray = data;
        var cardName = cardArray.name;
        var marketId = cardArray.cardmarket_id

        if (!cardName) {
            console.log('No results found');
            var responseEl = document.createElement('p');
            responseEl.textContent = "Sorry, the card either couldn't be found or it doesn't exist. Please try again!"
            searchBox.append(responseEl);
        } else {
            getCard(cardArray);
            getPrice(cardArray);
        }
    }) .catch(error => {
        console.error('Error:', error);
    })
    return;
};
