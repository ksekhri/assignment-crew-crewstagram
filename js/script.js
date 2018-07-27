// Globals

var CREWSTAGRAM_URL = 'http://alpha-web.crewapp.com/crewstagram';

var selectedImage = {};

var favoritedImages = {};

var photoList = [];

// Helper methods

function XHR(method, url, callback) {
    // Create XHR request
    var request = new XMLHttpRequest();

    // Create request to XHR object
    request.open(method, url);

    // Send request to server
    request.send();

    // Check request status and ready state
    request.onreadystatechange = function () {
        if (request.status === 200 && request.readyState === 4) {
            callback(JSON.parse(request.responseText));
        }
    }
}

function getData(url, callback) {
    XHR('GET', url, callback);
}

function postData(url, callback) {
    XHR('POST', url, callback);
}

function generatePhotoFrame(imageUrl) {
    var $imageContainer = document.createElement('div');
    $imageContainer.classList.add('image-list-image-container');
    var $image = document.createElement('img');
    $image.classList.add('image-list-image');
    $image.src = imageUrl;

    $imageContainer.appendChild($image);

    return $imageContainer;
}

// Single page navigation, hiding and showing content
function hideMainItems() {
    document.querySelectorAll('.main-content-container').forEach(function($node) {
        $node.classList.add('hidden');
    });
    document.getElementById('back-button').classList.add('hidden');
}

function showPhotoList() {
    hideMainItems();
    document.getElementById('photo-list').classList.remove('hidden');
}

function showPhotoDetails() {
    hideMainItems();
    document.getElementById('photo-details').classList.remove('hidden');
    document.getElementById('back-button').classList.remove('hidden');
}

function showSpinner() {
    hideMainItems();
    document.getElementById('spinner').classList.remove('hidden');
}

// Entry point

function onLoad() {
    fetchLoadAndShowPhotoList();
    document.getElementById('back-button').onclick = showPhotoList;
    document.getElementById('app-title').onclick = function() {
        location.reload();
    };
}

// Photo List methods

function fetchLoadAndShowPhotoList() {
    showSpinner();
    getData(CREWSTAGRAM_URL, generateAndShowPhotoList);
}

function fetchAndLoadPhotoList() {
    getData(CREWSTAGRAM_URL, generatePhotoList);
}

function generateAndShowPhotoList(photoListJson) {
    generatePhotoList(photoListJson);
    showPhotoList();
}

function generatePhotoList(photoListJson) {
    photoList = photoListJson.images;
    var $photoList = document.getElementById('photo-list');
    $photoList.innerHTML = '';
    photoList.forEach(function (image) {

        var $imageContainer = generatePhotoFrame(image.imageUrl);
        $imageContainer.onclick = function() {
            fetchAndLoadPhotoDetails(image);
        };

        $photoList.appendChild($imageContainer);
    });
}

// Photo Details Method

function fetchAndLoadPhotoDetails(image) {
    showSpinner();
    selectedImage = image;
    generateAndShowPhotoDetails();
}

function generateAndShowPhotoDetails() {
    generatePhotoDetails();
    showPhotoDetails();
}

function generatePhotoDetails() {
    var $photoDetails = document.getElementById('photo-details');
    $photoDetails.innerHTML = '';
    var $imageContainer = generatePhotoFrame(selectedImage.imageUrl);
    $imageContainer.id = 'details-image-container';
    if (!favoritedImages[selectedImage.uuid]) {
        $imageContainer.ondblclick = function () {
            favoriteImage(selectedImage.uuid);
        };
    }

    var $detailsContainer = document.createElement('div');
    $detailsContainer.classList.add('details-container');

    var $favoritesContainer = document.createElement('div');
    $favoritesContainer.id = 'favorites-container';
    var $favoriteIcon = document.createElement('div');
    $favoriteIcon.appendChild(document.createTextNode('♥'));
    if (favoritedImages[selectedImage.uuid]) {
        $favoriteIcon.classList.add('favorited');
    } else {
        $favoriteIcon.onclick = function() {
            favoriteImage(selectedImage.uuid);
        };
    }
    $favoriteIcon.id = 'favorite-icon';
    $favoritesContainer.appendChild($favoriteIcon);
    var $favoriteCount = document.createElement('div');
    $favoriteCount.innerHTML = selectedImage.favorites;
    $favoriteCount.id = 'favorites-count';
    $favoritesContainer.appendChild($favoriteCount);
    $detailsContainer.appendChild($favoritesContainer);

    var $commentsContainer = document.createElement('div');
    $commentsContainer.classList.add('comments-container');
    selectedImage.comments.forEach((comment) => {
        var $comment = document.createElement('div');
        $comment.classList.add('comment');
        var $username = document.createElement('span');
        $username.classList.add('username');
        $username.appendChild(document.createTextNode(comment.username + ': '));

        $comment.appendChild($username);
        $comment.appendChild(document.createTextNode(comment.body));
        $commentsContainer.appendChild($comment);
    });
    $detailsContainer.appendChild($commentsContainer);

    $photoDetails.appendChild($imageContainer);
    $photoDetails.appendChild($detailsContainer);
}

function updateFavoriteCount() {
    favoritedImages[selectedImage.uuid] = true;

    var $favoritesCount = document.getElementById('favorites-count');
    $favoritesCount.innerHTML = selectedImage.favorites;
    var $favoriteIcon = document.getElementById('favorite-icon');
    $favoriteIcon.classList.add('favorited');
    $favoriteIcon.onclick = function() {};
    document.getElementById('details-image-container').ondblclick = function() {};

    setTimeout(fetchAndLoadPhotoList);
}

function reloadDataAndUpdateFavoriteCount(newSelectedImage) {
    selectedImage = newSelectedImage;
    updateFavoriteCount();
}

function favoriteImage(uuid) {
    postData(CREWSTAGRAM_URL + '/' + uuid, reloadDataAndUpdateFavoriteCount);
}
