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

clearbtn = document.querySelector("#clearButton")

var newDeck = [];


// when the page is opened, function checks for an existing deck and prints it to the page if it exists
function retrieveDeck() {
    // checks if localStorage 'deck' exists
    if (!localStorage.getItem('deck')) {
        localStorage.clear('deck');
    }

    // stores localStorage 'deck' in a variable and sorts it alphabetically
    let oldDeck = JSON.parse(localStorage.getItem('deck'));
    oldDeck.sort();
    console.log(oldDeck);
    
    // loops once for each item in oldDeck
    for (var i = 0; i < oldDeck.length; i++) {
        // creates new <li> with the name of the card at oldDeck[i]
        var node = document.createTextNode("");
        node = oldDeck[i];
        var listItem = document.createElement("li");
        listItem.classList.add('label', 'deletetext' + [i]);
        listItem.setAttribute("id", "Card" + [i]);
        var RemoveButton = document.createElement("button");
        var countCards = [i]
        // prints card to the page
        listItem.append(node);

        var removeButtonEl = document.createElement('button');
        removeButtonEl.textContent = 'Remove Card';
        removeButtonEl.classList.add('button', 'deleteButton' + [i]);
        deckList.append(listItem, removeButtonEl);

        var cardButtonSinglei = document.querySelector('.deleteButton' + [i]);
        console.log("button" + [i])
        var cardtextSinglei = document.querySelector('.deletetext' + [i]);
        console.log("text" + [i])

        cardButtonSinglei.addEventListener("click", function () {
            cardButtonSinglei.remove('button');
            console.log("button" + [i])
            cardtextSinglei.textContent = ' ';
            console.log("text" + [i])
         })
    }
 
    for (var i = 0; i < countCards; i++) {
        
        var cardButtonSinglei = document.querySelector('.deleteButton' + [i]);
        console.log("button" + [i])
        var cardtextSinglei = document.querySelector('.deletetext' + [i]);
        console.log("text" + [i])

        cardButtonSinglei.addEventListener("click", function () {
            cardButtonSinglei.remove('button');
            console.log("button" + [i])
            cardtextSinglei.textContent = ' ';
            console.log("text" + [i])
         })

    }

    var cardButtonSingle = document.querySelector('.deleteButton' + countCards);
    var cardtextSingle = document.querySelector('.deletetext' + countCards);
    cardButtonSingle.addEventListener("click", function () {
        cardButtonSingle.remove('button');
        cardtextSingle.textContent = ' ';
    })


    clearbtn.addEventListener("click", function () { 
        var Deck = []
        localStorage.setItem('deck', JSON.stringify(Deck))
        console.log(localStorage.getItem('deck'))
        for (var i = 0; i < countCards; i++) {
        var cardText = document.querySelector('.deletetext' + [i]);
        document.querySelector('.deleteButton' + [i]).innerHTML = ' ';
        cardText.textContent = ' ';
        var ButtonText = document.querySelector('.deleteButton' + [i]);
        ButtonText.remove('button');
        }
        cardText = document.querySelector('.deletetext' + countCards);
        document.querySelector('.deleteButton' + countCards).innerHTML = ' ';
        cardText.textContent = ' ';
        ButtonText = document.querySelector('.deleteButton' + countCards);
        ButtonText.remove('button');
        console.log(localStorage.getItem('deck'));
}
)}


retrieveDeck();

/*
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
    //
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
        }
    }) .catch(error => {
        console.error('Error:', error);
    })
    return;
};

function getCard(cardArray) {
    var cardImage = cardArray.image_uris.border_crop;
    cardDisplay.src = cardImage;

    var cardPriceUsd = cardArray.prices.usd;
    var cardPriceUsdFoil = cardArray.prices.usd_foil;
    var cardPriceEuro = cardArray.prices.eur;
    var cardPriceEuroFoil = cardArray.prices.eur_foil;

    if (

};

function allCardNames() {
    //
    var cardIdName = encodeURI(`https://api.scryfall.com/catalog/card-names`);
  
    fetch(cardIdName, {
      method: 'GET',
      credentials: 'same-origin',
      redirect: 'follow',
      cache: 'reload'
    }) .then (response => {
        return response.json();
    }) .then (data => {
        console.log(data);

        cardNameAuto = data.data

        searchBar.autocomplete({
        maxResults: 10,
        source: function(request, response) {
            var results = $.ui.autocomplete.filter(cardNameAuto, request.term);
            response(results.slice(0, 10));
            }
        });
    }) .catch (error => {
        console.error('Error:', error);
    });
    return;
};

allCardNames();

*/