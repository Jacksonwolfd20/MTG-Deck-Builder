var searchbtn = document.querySelector("#searchbutton");
var PriceType = true

var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');

var cardImg = document.querySelector("#cardImg");

var modal = document.querySelector("#modalAlert");
var closeButton = document.querySelector("#closeButton");
var alertMessege = document.querySelector("#alertMessege");

let cardNamesAuto = []

let cardOptions = []
//finished
closeButton.addEventListener("click", function () {
    modal.classList.remove("is-active");
})

searchbtn.addEventListener("click", function () {
    // Get the card entereed
    var searchinput = $("#search-input").val().trim();
    //Verify a Card Name was entered
    if (searchinput === "" || searchinput == "undefined") {
      modal.classList.add("is-active");
      alertMessege.textContent = ("Sorry The Card Either Cant Be Found Or It Doesnt Exist Please Try Again")
    } else {
      // Switches the spaces with + symbol
      searchinput = additionSymbolAdd(searchinput);
      //Test what is going to the api
      console.log(searchinput);
      //Gets card shop info
      cardInput(searchinput);
      //Checks only one checkmark to determine the value of the other
      var checkMark = document.getElementById('UsdCheck');

      cardfinish(searchinput);

      //Checks Checkmarks
      if (checkMark.checked) {
        PriceType = true
      } else {
        PriceType = false
      }
    }
  
  }
  );
  
  // Switches the spaces with + symbol
function additionSymbolAdd(myString) {
    return myString.replace(/\s/g, "+");
  }

  function cardfinish(searchinput){
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
        var otherCardsNames = data.all_parts
  
        console.log(otherCardsNames);
        
        otherCardsNames = additionSymbolAdd(otherCardsNames.name);


        
        for (var i = 0; i < otherCardsNames.length; i++) {
          console.log(otherCardsNames[i].name);
          }
        
      })
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
          //printCards(cardarray);
  
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
        console.log(response);
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
  
        console.log(cardNamesAuto);
      })
    //catch's error
    //   .catch(error => {
    //     alert('allCardNames failed');
    //   });
    
    return;
  }
  
  
  
  allCardNames();
  