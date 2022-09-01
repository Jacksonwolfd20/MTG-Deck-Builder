var cardPreview = document.querySelector('#card-preview');
var cardCost = document.querySelector('#card-cost');

var usdBtn = document.querySelector('#usd-button');
var eurBtn = document.querySelector('#eur-button');
var standardBtn = document.querySelector('#standard-button');
var foilBtn = document.querySelector('#foil-button');

var deckList = document.querySelector('#deck-list');

var clearbtn = document.querySelector("#clearButton");

var newDeck = [];

var usdStandardCost = '';
var eurStandardCost = '';
var usdFoilCost = '';
var eurFoilCost = '';


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

        return;

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

        listItem.classList.add('label', 'deletetext' + [i], 'bigPicture');

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
        var Deck = [];
        localStorage.setItem('deck', JSON.stringify(Deck));
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


        cardPreview.src = "../images/mtgcardback.jpg";
        cardCost.innerHTML = '';
        usdStandardCost = '';
        usdFoilCost = '';
        eurStandardCost = '';
        eurFoilCost = '';
    

    $('.bigPicture').on('click', function(){
        var cardName = this.innerHTML;
        var cardLocation = encodeURI(`https://api.scryfall.com/cards/named?fuzzy=${cardName}`);

        fetch(cardLocation, {
            method: 'GET',
            credentials: 'same-origin',
            redirect: 'follow',
            cache: 'reload'

        }) .then(response => {
              return response.json();

        }) .then(data => {
            cardPreview.src= data.image_uris.border_crop;

            usdStandardCost = data.prices.usd;
            usdFoilCost = data.prices.usd_foil;
            eurStandardCost = data.prices.eur;
            eurFoilCost = data.prices.eur_foil;

            if(usdBtn.classList.contains("is-selected") && standardBtn.classList.contains("is-selected")) {
                cardCost.innerHTML = "$" + data.prices.usd;
            } else if(usdBtn.classList.contains("is-selected") && foilBtn.classList.contains("is-selected")) {
                cardCost.innerHTML = "$" + data.prices.usd_foil;
            } else if(eurBtn.classList.contains("is-selected") && standardBtn.classList.contains("is-selected")) {
                cardCost.innerHTML = "€" + data.prices.eur;
            } else if(eurBtn.classList.contains("is-selected") && foilBtn.classList.contains("is-selected")) {
                cardCost.innerHTML = "€" + data.prices.eur_foil;
            }

            if(cardCost.innerHTML === "null" || cardCost.innerHTML === "$null" || cardCost.innerHTML === "€null") {
                cardCost.innerHTML = "No price available";
            }
            
        })
    })


// usd/eur/standard/foilBtn change classes on click
usdBtn.addEventListener('click', function() {
    if (!usdBtn.classList.contains("is-selected")) {
        eurBtn.classList.remove("is-selected");
        eurBtn.classList.remove("is-dark");
        eurBtn.classList.add("is-light");

        usdBtn.classList.add("is-selected");
        usdBtn.classList.remove("is-light");
        usdBtn.classList.add("is-dark");
    }

    if (standardBtn.classList.contains("is-selected")) {
        cardCost.innerHTML = "$" + usdStandardCost;
    } else {
        cardCost.innerHTML = "$" + usdFoilCost;
    }

    if(cardCost.innerHTML === "null" || cardCost.innerHTML === "$null" || cardCost.innerHTML === "€null") {
        cardCost.innerHTML = "No price available";
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

    if (standardBtn.classList.contains("is-selected")) {
        cardCost.innerHTML = "€" + eurStandardCost;
    } else {
        cardCost.innerHTML = "€" + eurFoilCost;
    }

    if(cardCost.innerHTML === "null" || cardCost.innerHTML === "$null" || cardCost.innerHTML === "€null") {
        cardCost.innerHTML = "No price available";
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

    if (usdBtn.classList.contains("is-selected")) {
        cardCost.innerHTML = "$" + usdStandardCost;
    } else {
        cardCost.innerHTML = "€" + eurStandardCost;
    }

    if(cardCost.innerHTML === "null" || cardCost.innerHTML === "$null" || cardCost.innerHTML === "€null") {
        cardCost.innerHTML = "No price available";
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

    if (usdBtn.classList.contains("is-selected")) {
        cardCost.innerHTML = "$" + usdFoilCost;
    } else {
        cardCost.innerHTML = "€" + eurFoilCost;
    }

    if(cardCost.innerHTML === "null" || cardCost.innerHTML === "$null" || cardCost.innerHTML === "€null") {
        cardCost.innerHTML = "No price available";
    }
});


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

