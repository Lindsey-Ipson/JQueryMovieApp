const moviesArr = [];
let movieCounter = 1;

$('#movieForm').on('submit', function (evt) {
    evt.preventDefault();

    let title = $('#title').val();
    let rating = $('#rating').val();
    let text = `${title} with a rating of ${rating}/10`;

    let newMovieObj = {title, rating, text, id: movieCounter++};
    newMovieObj.htmlElement = createMovieElement(newMovieObj);
    moviesArr.push(newMovieObj);

    $("#movieForm").trigger("reset");

    refreshMovieList();
});

function createMovieElement (newMovieObj) {
    const $newLi = $('<li>').text(newMovieObj.text);
    $newLi.attr('id',newMovieObj['id']);
    $newLi.append($('<button>').text('X'));
    return $newLi;
};

function refreshMovieList () {
    $('#movieList').html('');
    const moviesToDisplay = [];
    for (let i = 0; i < moviesArr.length; i++) {
        moviesToDisplay.push(moviesArr[i].htmlElement);
    };
    $('#movieList').append(moviesToDisplay);
};

$('#movieList').on('click', 'li button', function(evt) {
    let $parentLi = $(evt.target).parent();
    let idx = $parentLi.attr('id');
    $parentLi.remove();
    for (let i = 0; i < moviesArr.length; i++) {
        if (moviesArr[i].id == idx) {
            moviesArr.splice(i, 1);
            break;
        }
    }
    refreshMovieList();
});
