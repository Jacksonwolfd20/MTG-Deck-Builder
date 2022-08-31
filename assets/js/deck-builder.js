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

var newDeck = [];

// button toggle functionality
usdBtn.addEventListener('click', function() {
    if (!usdBtn.classList.contains("is-selected")) {
        eurBtn.classList.remove("is-selected");
        eurBtn.classList.remove("is-dark");
        eurBtn.classList.add("is-light");

        usdBtn.classList.add("is-selected");
        usdBtn.classList.remove("is-light");
        usdBtn.classList.add("is-dark");
    }
});

eurBtn.addEventListener('click', function() {
    if (!eurBtn.classList.contains("is-selected")) {
        usdBtn.classList.remove("is-selected");
        usdBtn.classList.remove("is-dark");
        usdBtn.classList.add("is-light");

        eurBtn.classList.add("is-selected");
        eurBtn.classList.remove("is-light");
        eurBtn.classList.add("is-dark");
    }
});

standardBtn.addEventListener('click', function() {
    if (!standardBtn.classList.contains("is-selected")) {
        foilBtn.classList.remove("is-selected");
        foilBtn.classList.remove("is-dark");
        foilBtn.classList.add("is-light");

        standardBtn.classList.add("is-selected");
        standardBtn.classList.remove("is-light");
        standardBtn.classList.add("is-dark");
    }
});

foilBtn.addEventListener('click', function() {
    if (!foilBtn.classList.contains("is-selected")) {
        standardBtn.classList.remove("is-selected");
        standardBtn.classList.remove("is-dark");
        standardBtn.classList.add("is-light");

        foilBtn.classList.add("is-selected");
        foilBtn.classList.remove("is-light");
        foilBtn.classList.add("is-dark");
    }
});


// search button functionality
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

// when the page is opened, function checks for an existing deck and prints it to the page if it exists
function retrieveDeck() {
    // checks if localStorage 'deck' exists
    if (localStorage.getItem('deck') === null) {
        return;
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
        
        // prints card to the page
        listItem.append(node);
        deckList.append(listItem);
    }

    console.log(localStorage.getItem('deck'));
};

/*
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

    //if (

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
*/

retrieveDeck();
//allCardNames();