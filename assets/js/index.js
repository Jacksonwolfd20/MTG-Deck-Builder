//query selector variables
var searchBtn = document.querySelector('#searchButton');
var modal = document.querySelector('#modalBox');
var modalCloseBtn = document.querySelector('#modalClose');

//Search button functionality
searchBtn.addEventListener('click', function() {

    var searchInput = $('#searchBar').val().trim();
    var usdCheck = $('usdCheck');
    var eurCheck = $('eurCheck');

    //check for appropriate input fire warning modal if not.
    if (searchInput === '' || searchInput === undefined) {
        event.preventDefault();
        modal.classList.add('is-active');

    } else {
        //correct string format for scryfall api
        searchInput = searchInput.replace(/\s/g, '+');

        //pass search info to local storage
        localStorage.setItem('indexSearch', searchInput);
        localStorage.setItem('indexUsdCheck', usdCheck);
        localStorage.setItem('indexEurCheck', eurCheck);

        //link to deck builder page
        window.location.replace('../html/Pricing.html');

    }

});

// modal close button functionality
modalCloseBtn.addEventListener('click', function() {

    modal.classList.remove('is-active');

});