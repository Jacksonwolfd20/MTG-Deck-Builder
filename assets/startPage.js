// Stores Search button
var searchbtn = document.querySelector("#searchbutton");
var PriceType = true

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
          //Starts To Get The Price
          getCardPrice(cardmarketid);
          //Test To see if the ID is called
          console.log(cardmarketid);
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