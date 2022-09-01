// Stores Search button
var searchbtn = document.querySelector("#searchbutton");
var PriceType = true
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
//getting the variable for the card img
var cardImg = document.querySelector("#cardImg");
// sets modal to variable
var modal = document.querySelector("#modalAlert");
var closeButton = document.querySelector("#closeButton");
var alertMessege = document.querySelector("#alertMessege")
// Stores Prices
var displayPriceUsd = (" ")
var displayPriceUsdFoil = (" ")
var displayPriceEuro = (" ")
var displayPriceEuroFoil = (" ")
//Creates a Variable Outside of the code
let cardNamesAuto = [];

var exchangeRate = localStorage.getItem('Exchange');

var Deck = [];

var cardPriceFinal = 0

progressLength = JSON.parse(localStorage.getItem('deck'));
progress.setAttribute("value", progressLength.length);


function firstSearch() {

  var searchinput = localStorage.getItem('indexSearch')


  cardInput(searchinput);
}

firstSearch()

// Switches the spaces with + symbol
function additionSymbolAdd(myString) {
  return myString.replace(/\s/g, "+");
}

closeButton.addEventListener("click", function () {
  modal.classList.remove("is-active");
})




//adds search functionality
searchbtn.addEventListener("click", function () {
  event.preventDefault();
  // Get the card entereed
  var searchinput = $("#search-input").val().trim();
  //Verify a Card Name was entered
  if (searchinput === "" || searchinput == "undefined") {
    modal.classList.add('is-active');
    alertMessege.textContent = ("Sorry You Must Enter A Card for the site to work");
  } else {
    // Switches the spaces with + symbol
    searchinput = additionSymbolAdd(searchinput);
    //Gets card shop info
    cardInput(searchinput);
    //Checks only one checkmark to determine the value of the other
    var checkMarkMain = document.getElementById('UsdCheck');
    //Checks Checkmarks
    if (checkMarkMain.checked) {
      PriceType = true
    } else {
      PriceType = false
    }
  }


});


//Gets card shop info
function cardInput(searchinput) {
  //Stores The URL
  var cardcode = encodeURI(`https://api.scryfall.com/cards/named?fuzzy=${searchinput}`);
  //Fetches the Api that was set into the variable above
  fetch(cardcode, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    cache: 'reload'  // Refresh the cache
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      //Stores the data to be used later on
      var cardarray = data
      //Checks the card name
      var cardRealName = cardarray.name
      //see if there is actully a card under the name
      if (!cardarray.name) {

        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        resultContentEl.textContent = '';

        //Starts To Get The Price
        getCardPrice(cardarray);



        //Adds Showing of Results 
        resultTextEl.textContent = (" " + cardRealName);

      }
    })
  return;
}



function getCardPrice(cardarray) {
  //Gathers the prices from the API  
  cardPriceUsd = cardarray.prices.usd
  cardPriceUsdFoil = cardarray.prices.usd_foil

      console.log(exchangeRate)
      cardPriceEuro = cardPriceUsd * exchangeRate;
      cardPriceEuro = cardPriceEuro.toString();
      cardPriceEuro = cardPriceEuro.substring(0,5);

      cardPriceEuroFoil = cardPriceUsdFoil * exchangeRate;
      cardPriceEuroFoil = cardPriceEuroFoil.toString();
      cardPriceEuroFoil = cardPriceEuroFoil.substring(0,5);


      //testing and applying definitions to be used later
      if (cardPriceUsd === null && cardPriceUsdFoil === null) {

        displayPriceUsd = ("Normal card price is unavailable")
        displayPriceUsdFoil = ("Foil card price is unavailable")

      } else if (cardPriceUsd && cardPriceUsdFoil === null) {
        displayPriceUsd = (" $ " + cardPriceUsd + "~")
        displayPriceUsdFoil = ("Foil card price is unavailable")
      } else if (cardPriceUsd === null && cardPriceUsdFoil) {

        displayPriceUsd = ("Normal card price is unavailable")

        displayPriceUsdFoil = (" $ " + cardPriceUsdFoil + "~")
      } else {
        displayPriceUsd = (" $ " + cardPriceUsd + "~")
        displayPriceUsdFoil = (" $ " + cardPriceUsdFoil + "~")
      }

      if (cardPriceEuro === null && cardPriceEuroFoil === null) {

        displayPriceEuro = ("Normal card price is unavailable")
        displayPriceEuroFoil = ("Foil card price is unavailable")
      } else if (cardPriceEuro && cardPriceEuroFoil === null) {
        displayPriceEuro = (" € " + cardPriceEuro + "~")
        displayPriceEuroFoil = ("Foil card price is unavailable")
      } else if (cardPriceEuro === null && cardPriceEuroFoil) {

        displayPriceEuro = ("Normal card price is unavailable")

        displayPriceEuroFoil = (" € " + cardPriceEuroFoil + "~")
      } else {
        displayPriceEuro = (" € " + cardPriceEuro + "~")
        displayPriceEuroFoil = (" € " + cardPriceEuroFoil + "~")
      }
      //Prints cards
      printCards(cardarray);
    }




//function to print all the info to the screen
function printCards(cardarray) {

  var resultCard = document.createElement('div');
  resultCard.classList.add('box');

  var resultBody = document.createElement('div');
  resultBody.classList.add("column");
  resultCard.append(resultBody);
  //Prints the cards title
  var titleEl = document.createElement('h3');
  titleEl.classList.add("title");

  titleEl.textContent = cardarray.name;

  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    '<strong>Card Type:</strong> ' + cardarray.type_line + '<br/>';
  if (PriceType) {
    bodyContentEl.innerHTML +=
      '<strong>Card Price:</strong> ' + displayPriceUsd + '<br/>';
    bodyContentEl.innerHTML +=
      '<strong>Card Foil Price:</strong> ' + displayPriceUsdFoil + '<br/>';
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Card Price:</strong> ' + displayPriceEuro + '<br/>';
    bodyContentEl.innerHTML +=
      '<strong>Card Foil Price:</strong> ' + displayPriceEuroFoil + '<br/>';
  }

  if (cardarray.oracle_text) {
    bodyContentEl.innerHTML +=
      '<strong>Card Text:</strong> ' + cardarray.oracle_text + '<br/>';
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Card Text:</strong> There is none.';
  }

  //Prints the img to the search
  var img = document.createElement("IMG");
  img.classList.add("column", "imgLeft");
  img.src = cardarray.image_uris.border_crop;
  img.width = "250";
  img.height = "100";



  var linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'Add To Deck List';
  linkButtonEl.classList.add('button');

  var progress = document.querySelector("#progress");
  var progressLength = JSON.parse(localStorage.getItem('deck'));
  linkButtonEl.addEventListener("click", function () {
    event.preventDefault();
    progress.setAttribute("value", progressLength.length);
    if (localStorage.getItem('deck') === null) {
      var Deck = []
      localStorage.setItem('deck', JSON.stringify(Deck))
      progressLength = JSON.parse(localStorage.getItem('deck'));
      progress.setAttribute("value", progressLength.length);
    }
    var obj = JSON.parse(localStorage.getItem('deck'));
    if (obj.length > 99) {
      modal.classList.add('is-active');
      progressLength = JSON.parse(localStorage.getItem('deck'));
      progress.setAttribute("value", progressLength.length);
    } else if (obj.includes(cardarray.name)) {
      if (cardarray.type_line.startsWith("Basic Land") || cardarray.type_line.startsWith("Basic Snow Land")) {
        var Deck = JSON.parse(localStorage.getItem('deck'));
        Deck.push(cardarray.name);//Add the text 'item1' to Deck
        localStorage.setItem('deck', JSON.stringify(Deck))
        obj = JSON.parse(localStorage.getItem('deck'));

      } else {

        modal.classList.add('is-active');
        alertMessege.textContent = ("Sorry Commander is a singleton format which means you can only have 1 of each card exception is basic lands");
        progressLength = JSON.parse(localStorage.getItem('deck'));
        progress.setAttribute("value", progressLength.length);

      }
    } else {
      var Deck = JSON.parse(localStorage.getItem('deck'));
      Deck.push(cardarray.name);//Add the text 'item1' to Deck
      localStorage.setItem('deck', JSON.stringify(Deck))
      obj = JSON.parse(localStorage.getItem('deck'));
    }

  })

  resultBody.append(titleEl, bodyContentEl, linkButtonEl, img);

  resultContentEl.append(resultCard);
}



//Work in progress--
function allCardNames() {
  //Stores The URL
  var cardcodename = encodeURI(`https://api.scryfall.com/catalog/card-names`);

  fetch(cardcodename, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    cache: 'reload'  // Refresh the cache
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      //Stores the data to be used later on
      cardNamesAuto = data.data
      $('#search-input').autocomplete({
        maxResults: 10,
        source: function (request, response) {
          var results = $.ui.autocomplete.filter(cardNamesAuto, request.term);

          response(results.slice(0, 10));
        }
      });


    })

  return;
}

allCardNames();
