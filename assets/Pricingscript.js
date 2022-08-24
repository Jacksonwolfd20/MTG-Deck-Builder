// Stores Search button
var searchbtn = document.querySelector("#searchbutton");
var PriceType = true

var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');

var cardImg = document.querySelector("#cardImg")

// Switches the spaces with + symbol
function additionSymbolAdd(myString) {
  return myString.replace(/\s/g, "+");
}

searchbtn.addEventListener("click", function (){
    event.preventDefault();
    // Get the city entereed
    var searchinput = $("#search-input").val().trim();
    var UsdCheck = $("#UsdCheck");
    var EuroCheck =  $("#EuroCheck");
    //Verify a Card Name was entered
    if (searchinput === "" || searchinput == "undefined") {
      alert("Please enter a card")
    } else {
      // Switches the spaces with + symbol
      searchinput = additionSymbolAdd(searchinput);

      console.log(searchinput);
      cardInput(searchinput);

      var checkMark = document.getElementById('UsdCheck');

    if (checkMark.checked){
       PriceType = true
    }else{
       PriceType = false
    }
      }
    }
  );
  //coding card img finder
function cardImgcreator(){
  //Stores The URL
  var cardcode = encodeURI(`https://api.scryfall.com/cards/named?fuzzy=${searchinput}`);
    
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
      //Collects the CardMarket ID
      cardmarketid = data.cardmarket_id
      var cardRealName = data.name
      //Starts To Get The Price
      getCardPrice(cardmarketid);
      //Sends Cards Real Name
      console.log(cardRealName);
      //Test To see if the ID is called
      console.log(cardmarketid);
    })
    .catch(error => {
      alert('No card Img');
    });
}
  //Gets card shop info
function cardInput(searchinput){
    //Stores The URL
    var cardcode = encodeURI(`https://api.scryfall.com/cards/named?fuzzy=${searchinput}`);
    
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
          //Collects the CardMarket ID
          cardmarketid = data.cardmarket_id
          var cardRealName = data.name

          if (!data.name) {
            console.log('No results found!');
            resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
          } else {
            resultContentEl.textContent = '';
            //Fix It
            //printCards(cardcode);
            //Adds Showing of Results 
          resultTextEl.textContent = (" " + cardRealName);
          //Starts To Get The Price
          getCardPrice(cardmarketid);
          //Sends Cards Real Name
          console.log(cardRealName);
          //Test To see if the ID is called
          console.log(cardmarketid);
        }
        })
        .catch(error => {
          alert('Card entered is invalid');
        });
      return;
      }

      function getCardPrice(cardmarketid) {
        //Enters the card id when looking through the API
        var CardCodeApi = encodeURI(`https://api.scryfall.com/cards/cardmarket/${cardmarketid}`);
        fetch(CardCodeApi, {
          method: 'GET', //GET is the default.
          credentials: 'same-origin', // include, *same-origin, omit
          redirect: 'follow', // manual, *follow, error
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            //Gathers the prices from the API 
            cardPriceUsd = data.prices.usd
            cardPriceUsdFoil = data.prices.usd_foil
            cardPriceEuro = data.prices.eur
            cardPriceEuroFoil = data.prices.eur_foil
            //Test the API
            //Seperates Prices Shown
            if(PriceType === true){
            console.log("Card price is $ " + cardPriceUsd);
            console.log("Foil card price is $ " + cardPriceUsdFoil);
            }else{
            console.log("Card price is € " + cardPriceEuro);
            console.log("Foil card price is € " + cardPriceEuroFoil);
            }
          });
        return;
      }

     
      function printCards(cardcode) {
        console.log(cardcode);

        fetch(cardcode, {
            method: 'GET', //GET is the default.
            credentials: 'same-origin', // include, *same-origin, omit
            redirect: 'follow', // manual, *follow, error
          })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            // set up `<div>` to hold result content
        var resultCard = document.createElement('div');
        resultCard.classList.add('box');
      
        var resultBody = document.createElement('div');
        resultBody.classList.add('box');
        resultCard.append(resultBody);
      
        var titleEl = document.createElement('h3');
        titleEl.textContent = data.name;
      
        var bodyContentEl = document.createElement('p');
        bodyContentEl.innerHTML =
          '<strong>Card Type:</strong> ' + data.type_line + '<br/>';
            if (PriceType){
          bodyContentEl.innerHTML +=
            '<strong>Card Price:</strong> ' + "$" + data.prices.usd + '<br/>';
            bodyContentEl.innerHTML +=
            '<strong>Card Foil Price:</strong> ' + "$" + data.prices.usd_foil + '<br/>';
            }else{
                bodyContentEl.innerHTML +=
            '<strong>Card Price:</strong> ' + "€" + data.prices.eur + '<br/>';
            bodyContentEl.innerHTML +=
            '<strong>Card Foil Price:</strong> ' + "€" + data.prices.eur_foil + '<br/>';
            }
      
        if (data.oracle_text) {
          bodyContentEl.innerHTML +=
            '<strong>Card Text:</strong> ' + data.oracle_text + '<br/>';
        } else {
          bodyContentEl.innerHTML +=
            '<strong>Card Text:</strong> There is none.';
        }
      
        var linkButtonEl = document.createElement('a');
        linkButtonEl.textContent = 'Add To Deck List';
        linkButtonEl.classList.add('button', 'is-primary');
      
        resultBody.append(titleEl, bodyContentEl, linkButtonEl);
      
        resultContentEl.append(resultCard);
        });
        
      }
      
      