var searchBtn = document.querySelector('#searchButton');
var modalCloseBtn = document.querySelector('#modalClose');

searchBtn.addEventListener('click', function() {

    var searchInput = $('#searchBar').val().trim();
    var usdCheck = $('usdCheck');
    var eurCheck = $('eurCheck');

    if (searchInput === '' || searchInput === undefined) {

        modal.classList.add('is-active');

    } else {

        searchInput = searchInput.replace(/\s/g, '+');

        localStorage.setItem('indexSearch', searchInput);
        localStorage.setItem('usdCheck', usdCheck);
        localStorage.setItem('eurCheck', eurCheck);

        window.location.replace('./assets/html/deckBuilder');

    }

});

// modal
modalCloseBtn.addEventListener('click', function() {

    modal.classList.remove('is-active');

});