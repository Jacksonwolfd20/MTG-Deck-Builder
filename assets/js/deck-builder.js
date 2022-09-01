var usdBtn = document.querySelector('#usd-button');
var eurBtn = document.querySelector('#eur-button');
var standardBtn = document.querySelector('#standard-button');
var foilBtn = document.querySelector('#foil-button');

var cardDisplay = document.querySelector('#card-display');
var cardCost = document.querySelector('#card-cost');

var deckList = document.querySelector('#deck-list');
var clearbtn = document.querySelector("#clearButton");

clearbtn = document.querySelector("#clearButton")

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


// when the page is opened, function checks for an existing deck and prints it to the page if it exists
function retrieveDeck() {
    // checks if localStorage 'deck' exists
    if (!localStorage.getItem('deck')) {
        localStorage.clear('deck');

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

// when the page is opened, function checks for an existing deck and prints it to the page if it exists
function retrieveDeck() {
    // checks if localStorage 'deck' exists
    if (localStorage.getItem('deck') === null) {
        return;
    }

    // stores localStorage 'deck' in a variable and sorts it alphabetically
    let oldDeck = JSON.parse(localStorage.getItem('deck'));
    console.log(oldDeck);
    
    // loops once for each item in oldDeck
    for (var i = 0; i < oldDeck.length; i++) {
        // creates new <li> with the name of the card at oldDeck[i]
        var node = document.createTextNode("");
        node = oldDeck[i];

        var listItem = document.createElement("li");
        listItem.classList.add('label', 'deletetext' + [i]);
        listItem.setAttribute("id", "Card" + [i]);

        var countCards = [i]

        // prints card to the page
        listItem.append(node);

        // creates a button to remove the card
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
)};

deckList.querySelector('li').addEventListener('click', function() {
    var cardName = this.textContent;
    var cardId = encodeURI(`https://api.scryfall.com/cards/named?fuzzy=${cardName}`);

    fetch(cardId, {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
        cache: 'reload'
        
    }) .then (response => {
        return response.json();

    }) .then (data => {
        var price = "";

        if(usdBtn.classList.contains("is-selected") && standardBtn.classList.contains("is-selected")) {
            price = data.prices.usd;
        } else if(usdBtn.classList.contains("is-selected") && foilBtn.classList.contains("is-selected")) {
            price = data.prices.usd_foil;
        } else if(eurBtn.classList.contains("is-selected") && standardBtn.classList.contains("is-selected")) {
            price = data.prices.eur;
        } else if(eurBtn.classList.contains("is-selected") && foilBtn.classList.contains("is-selected")) {
            price = data.prices.eur_foil;
        }

        cardDisplay.src = selected.image_uris.border_crop;
        cardCost.textContent = price

    }) .catch(error => {
        console.error('Error:', error);

    })
    return;
});

retrieveDeck();