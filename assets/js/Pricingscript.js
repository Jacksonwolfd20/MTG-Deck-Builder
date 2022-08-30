// Stores Search button
var searchbtn = document.querySelector("#searchbutton");
var PriceType = true
//Search button array
searchbtnmain = document.querySelector("#searchButton")

var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');

var cardImg = document.querySelector("#cardImg");

var modal = document.querySelector("#modalAlert");
var closeButton = document.querySelector("#closeButton");
var alertMessege = document.querySelector("#alertMessege")

var displayPriceUsd = (" ")
var displayPriceUsdFoil = (" ")
var displayPriceEuro = (" ")
var displayPriceEuroFoil = (" ")

let cardNamesAuto = [];


// Pulls from local storage to display the first card
function firstSearch(){
  //localStorage.getItem('indexSearch', searchInput);
  //localStorage.getItem('indexUsdCheck', usdCheck);
  //localStorage.getItem('indexEurCheck', eurCheck);

  var searchinput = localStorage.getItem('indexSearch')

  //console.log(localStorage.getItem('indexSearch', searchInput));

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
  console.log(searchinput);
  //Verify a Card Name was entered
  if (searchinput === "" || searchinput == "undefined") {
    modal.classList.add('is-active');
    alertMessege.textContent = ("Sorry The Card Either Cant Be Found Or It Doesnt Exist Please Try Again")
  } else {
    // Switches the spaces with + symbol
    searchinput = additionSymbolAdd(searchinput);
    //Test what is going to the api
    console.log(searchinput);
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

}
);


//coding card img finder
function cardImgcreator(cardarray) {
  //Stores card Name
  var cardRealName = cardarray.name
  //Stores the img to be used later on
  var cardImgTest = cardarray.image_uris.border_crop
  //Starts To Get The Price
  console.log(cardRealName);
  //Test To see if the ID is called
  console.log(cardImgTest);
}


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
      //Check the card id
      var cardmarketid = cardarray.cardmarket_id
      //see if there is actully a card under the name
      if (!cardarray.name) {
        console.log('No results found!');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        resultContentEl.textContent = '';

        //Starts To Get The Price
        getCardPrice(cardarray);

        //Prints cards
        printCards(cardarray);

        //Adds Showing of Results 
        resultTextEl.textContent = (" " + cardRealName);
        //Sends Cards Real Name
        console.log(cardRealName);
        //Test To see if the ID is called
        console.log(cardmarketid);
        //img creator
        cardImgcreator(cardarray);

      }
    })
   .catch(error => {
  alert('Card entered is invalid');
   });
  return;
}

function getCardPrice(cardarray) {
  //Gathers the prices from the API  
  cardPriceUsd = cardarray.prices.usd
  cardPriceUsdFoil = cardarray.prices.usd_foil
  cardPriceEuro = cardarray.prices.eur
  cardPriceEuroFoil = cardarray.prices.eur_foil
//testing and pplying definitions to be used later
  if(cardPriceUsd === null && cardPriceUsdFoil === null){
    console.log("Normal card price is unavalible");
    console.log("Foil card price is unavalible");
    displayPriceUsd = ("Normal card price is unavalible")
    displayPriceUsdFoil = ("Foil card price is unavalible")
  }else if(cardPriceUsd && cardPriceUsdFoil === null){
    console.log(" $ " + cardPriceUsd + "~");
    console.log("Foil card price is unavalible");
    displayPriceUsd = (" $ " + cardPriceUsd + "~")
    displayPriceUsdFoil = ("Foil card price is unavalible")
  }else if(cardPriceUsd === null && cardPriceUsdFoil){
    console.log("Normal card price is unavalible");
    console.log(" $ " + cardPriceUsdFoil + "~");
    displayPriceUsd = ("Normal card price is unavalible")
    displayPriceUsdFoil = (" $ " + cardPriceUsdFoil + "~")
  }else{
    console.log(" $ " + cardPriceUsd + "~");
    console.log(" $ " + cardPriceUsdFoil + "~");
    displayPriceUsd = (" $ " + cardPriceUsd + "~")
    displayPriceUsdFoil = (" $ " + cardPriceUsdFoil + "~")
  }

  if(cardPriceEuro === null && cardPriceEuroFoil === null){
    console.log("Normal card price is unavalible");
    console.log("Foil card price is unavalible");
    displayPriceEuro = ("Normal card price is unavalible")
    displayPriceEuroFoil = ("Foil card price is unavalible")
  }else if(cardPriceEuro && cardPriceEuroFoil === null){
    console.log(" € " + cardPriceEuro + "~");
    console.log("Foil card price is unavalible");
    displayPriceEuro = (" € " + cardPriceEuro + "~")
    displayPriceEuroFoil = ("Foil card price is unavalible")
  }else if(cardPriceEuro === null && cardPriceEuroFoil){
    console.log("Normal card price is unavalible");
    console.log("Foil card price is € " + cardPriceEuroFoil + "~");
    displayPriceEuro = ("Normal card price is unavalible")
    displayPriceEuroFoil = (" € " + cardPriceEuroFoil + "~")
  }else{
    console.log("Card price is € " + cardPriceEuro + "~");
    console.log("Foil card price is € " + cardPriceEuroFoil + "~");
    displayPriceEuro = (" € " + cardPriceEuro + "~")
    displayPriceEuroFoil = (" € " + cardPriceEuroFoil + "~")
  }
  
  
};

//function to print all the info to the screen
function printCards(cardarray) {

  console.log(cardarray);

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
  linkButtonEl.classList.add('button', 'is-primary');

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
      console.log(data);
      //Stores the data to be used later on
     cardNamesAuto = data.data
     $('#search-input').autocomplete({
      maxResults: 10,
      source: function(request, response) {
        var results = $.ui.autocomplete.filter(cardNamesAuto, request.term);

        response(results.slice(0, 10));
    }
     });

      
    })
    .catch(error => {
      alert('Card entered is invalid');
       });
      return;
  
  return;
}

addEventListener

allCardNames()











