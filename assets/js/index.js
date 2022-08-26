var searchBtn = document.querySelector('#searchButton');
var modalCloseBtn = document.querySelector('#modalClose');
var modal = document.querySelector('#modalBox');

searchBtn.addEventListener('click', function() {

    var searchInput = $('#searchBar').val().trim();
    var usdCheck = $('usdCheck');
    var eurCheck = $('eurCheck');

    if (searchInput === '' || searchInput === undefined) {

        modal.classList.add('is-active');

    } else {

        searchInput = searchInput.replace(/\s/g, '+');

        localStorage.setItem('indexSearch', searchInput);
        localStorage.setItem('indexUsdCheck', usdCheck);
        localStorage.setItem('indexEurCheck', eurCheck);

        window.location.replace('./assets/html/deckBuilder');

    }

});

// modal
modalCloseBtn.addEventListener('click', function() {

    modal.classList.remove('is-active');

});