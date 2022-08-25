var searchBtn = document.querySelector("#searchButton");

searchBtn.addEventListener('click', function() {

    var searchInput = $('#searchBar').val().trim();
    var usdCheck = $('usdCheck');
    var eurCheck = $('eurCheck');

    if (searchInput === '' || searchInput === undefined) {

        alert('You must enter a card name')

    } else {

        searchInput = searchInput.replace(/\s/g, '+');

        localStorage.setItem('indexSearch', searchInput);
        localStorage.setItem('usdCheck', usdCheck);
        localStorage.setItem('eurCheck', eurCheck);

    }

});