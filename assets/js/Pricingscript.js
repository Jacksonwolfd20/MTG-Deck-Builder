// Stores Search button
var searchbtn = document.querySelector("#searchbutton");
var PriceType = true

var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');

var cardImg = document.querySelector("#cardImg")

//work in progress
//var cardNamesAuto = 0

// Switches the spaces with + symbol
function additionSymbolAdd(myString) {
  return myString.replace(/\s/g, "+");
}

searchbtn.addEventListener("click", function () {
  event.preventDefault();
  // Get the card entereed
  var searchinput = $("#search-input").val().trim();
  //Verify a Card Name was entered
  if (searchinput === "" || searchinput == "undefined") {
    alert("Please enter a card")
  } else {
    // Switches the spaces with + symbol
    searchinput = additionSymbolAdd(searchinput);
    //Test what is going to the api
    console.log(searchinput);
    //Gets card shop info
    cardInput(searchinput);
    //Checks only one checkmark to determine the value of the other
    var checkMark = document.getElementById('UsdCheck');
    //Checks Checkmarks
    if (checkMark.checked) {
      PriceType = true
    } else {
      PriceType = false
    }
  }

}
);


  
//coding card img finder
function cardImgcreatorTester(cardarray) {
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

        //Prints cards
        printCards(cardarray);

        // Work in Progress
        //  for (var i = 0; i < otherCardsNames.length; i++) {
        // cardInput(otherCardsNames[i]);
        // }


        //Adds Showing of Results 
        resultTextEl.textContent = (" " + cardRealName);
        //Starts To Get The Price
        getCardPrice(cardarray);
        //Sends Cards Real Name
        console.log(cardRealName);
        //Test To see if the ID is called
        console.log(cardmarketid);
        //img creator
        cardImgcreator(cardarray);

      }
    })
   // .catch(error => {
      //alert('Card entered is invalid');
   // });
  return;
}

function getCardPrice(cardarray) {
  //Gathers the prices from the API 
  cardPriceUsd = cardarray.prices.usd
  cardPriceUsdFoil = cardarray.prices.usd_foil
  cardPriceEuro = cardarray.prices.eur
  cardPriceEuroFoil = cardarray.prices.eur_foil
  //Test the API
  //Seperates Prices Shown
  if (PriceType === true) {
    console.log("Card price is $ " + cardPriceUsd);
    console.log("Foil card price is $ " + cardPriceUsdFoil);
  } else {
    console.log("Card price is € " + cardPriceEuro);
    console.log("Foil card price is € " + cardPriceEuroFoil);
  }
};

//function to print all the info to the screen
function printCards(cardarray) {

  console.log(cardarray);

  var resultCard = document.createElement('div');
  resultCard.classList.add('box');

  var resultBody = document.createElement('div');
  resultBody.classList.add( "column");
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
      '<strong>Card Price:</strong> ' + "$" + cardarray.prices.usd + "~" + '<br/>';
    bodyContentEl.innerHTML +=
      '<strong>Card Foil Price:</strong> ' + "$" + cardarray.prices.usd_foil + "~" + '<br/>';
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Card Price:</strong> ' + "€" + cardarray.prices.eur + "~" + '<br/>';
    bodyContentEl.innerHTML +=
      '<strong>Card Foil Price:</strong> ' + "€" + cardarray.prices.eur_foil + "~" + '<br/>';
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
        function allCardNames(){
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
               var cardNamesAuto = data

                console.log(cardNamesAuto);
              })
              //catch's error
           //   .catch(error => {
           //     alert('allCardNames failed');
           //   });

           $(function () {
              var cardNames = [
                cardNamesAuto
              ];
              $('#search-input').autocomplete({
                source: cardNames,
              });
            });
            return;
            }
            //allCardNames();

            
      
      
            
      
      