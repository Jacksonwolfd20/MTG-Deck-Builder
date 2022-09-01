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

var clearbtn = document.querySelector("#clearButton")

var newDeck = [];

// set a prototype function to remove cards in the array later on
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

// when the page is opened, function checks for an existing deck and prints it to the page if it exists
function retrieveDeck() {
    // checks if localStorage 'deck' exists
    if (!localStorage.getItem('deck')) {
        localStorage.clear('deck');
    }

    // stores localStorage 'deck' in a variable and sorts it alphabetically
    let oldDeck = JSON.parse(localStorage.getItem('deck'));
    oldDeck.sort();
    
    let currentDeck = JSON.parse(localStorage.getItem('deck'));

    // loops once for each item in oldDeck
    for (let i = 0; i < oldDeck.length; i++) {
        // creates new <li> with the name of the card at oldDeck[i]
        let node = document.createTextNode("");
        node = oldDeck[i];
        let listItem = document.createElement("li");
        listItem.classList.add('label', 'deletetext' + [i]);
        listItem.setAttribute("id", "Card" + [i]);
        
        var countCards = [i]
        // prints card to the page
        listItem.append(node);

        let removeButtonEl = document.createElement('button');
        removeButtonEl.textContent = 'Remove Card';
        removeButtonEl.classList.add('button', 'deleteButton' + [i]);
        deckList.append(listItem, removeButtonEl);

        let cardButtonSinglei = document.querySelector('.deleteButton' + [i]);
        let cardtextSinglei = document.querySelector('.deletetext' + [i]);

        //Clears specific cards from array then clears them visual
        cardButtonSinglei.addEventListener("click", function () {
            currentDeck.remove(node);
            localStorage.setItem('deck', JSON.stringify(currentDeck))
            cardButtonSinglei.remove('button');
            cardtextSinglei.textContent = ' ';
         })

    }
 
    //Clears the whole deck and sets the array to blank
    clearbtn.addEventListener("click", function () { 
        var Deck = []
        localStorage.setItem('deck', JSON.stringify(Deck))
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
}
)}

retrieveDeck();
