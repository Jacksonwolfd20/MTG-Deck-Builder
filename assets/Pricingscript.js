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
function cardImgcreator(cardarray){
  var cardRealName = cardarray.name
      var cardImgTest = cardarray.image_uris.border_crop
      //Starts To Get The Price
      console.log(cardRealName);
      //Test To see if the ID is called
      console.log(cardImgTest);
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
          var cardarray = data
          var cardmarketid = cardarray.cardmarket_id
          var cardRealName = cardarray.name

          if (!cardarray.name) {
            console.log('No results found!');
            resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
          } else {
            resultContentEl.textContent = '';
            //Fix It
            printCards(cardarray);
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
            //Test the API
            //Seperates Prices Shown
            if(PriceType === true){
            console.log("Card price is $ " + cardPriceUsd);
            console.log("Foil card price is $ " + cardPriceUsdFoil);
            }else{
            console.log("Card price is € " + cardPriceEuro);
            console.log("Foil card price is € " + cardPriceEuroFoil);
            }
          };

     
      function printCards(cardarray) {

        console.log(cardarray);

        var resultCard = document.createElement('div');
        resultCard.classList.add('box');
      
        var resultBody = document.createElement('div');
        resultBody.classList.add('box');
        resultCard.append(resultBody);
        
        //Prints the cards title
        var titleEl = document.createElement('h3');
        titleEl.textContent = cardarray.name;

        

        //Prints the img to the search
        var imgFrame = document.querySelector('#img');
        var img = document.createElement("IMG");
        img.src = cardarray.image_uris.border_crop;
        img.width = "250";
        img.height = "100";
        imgFrame.appendChild(img);
        
      
        var bodyContentEl = document.createElement('p');
        bodyContentEl.innerHTML =
          '<strong>Card Type:</strong> ' + cardarray.type_line + '<br/>';
            if (PriceType){
          bodyContentEl.innerHTML +=
            '<strong>Card Price:</strong> ' + "$" + cardarray.prices.usd + "~" + '<br/>';
            bodyContentEl.innerHTML +=
            '<strong>Card Foil Price:</strong> ' + "$" + cardarray.prices.usd_foil + "~" + '<br/>';
            }else{
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
      
        var linkButtonEl = document.createElement('a');
        linkButtonEl.textContent = 'Add To Deck List';
        linkButtonEl.classList.add('button', 'is-primary');
      
        resultBody.append(titleEl, bodyContentEl, linkButtonEl);
      
        resultContentEl.append(resultCard);
        }
        
      
      
      