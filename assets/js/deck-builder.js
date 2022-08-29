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