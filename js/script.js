// Globals

var CREWSTAGRAM_URL = 'http://alpha-web.crewapp.com/crewstagram';

var selectedImage = {};

// Helper methods

function getData(url, callback) {
    // Create XHR request
    var request = new XMLHttpRequest();

    // Create request to XHR object
    request.open('GET', url);

    // Send request to server
    request.send();

    // Check request status and ready state
    request.onreadystatechange = function () {
        if (request.status === 200 && request.readyState === 4) {
            callback(JSON.parse(request.responseText));
        }
    }
}

function postData(url, callback) {
    // Create XHR request
    var request = new XMLHttpRequest();

    // Create request to XHR object
    request.open('POST', url);

    // Send request to server
    request.send();

    // Check request status and ready state
    request.onreadystatechange = function () {
        if (request.status === 200 && request.readyState === 4) {
            callback(JSON.parse(request.responseText));
        }
    }
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
    fetchAndLoadPhotoList();
    document.getElementById('back-button').onclick = showPhotoList
    document.getElementById('app-title').onclick = showPhotoList;
}

// Photo List methods

function fetchAndLoadPhotoList() {
    showSpinner();
    getData(CREWSTAGRAM_URL, generatePhotoList);
}

function generatePhotoList(jsonData) {
    var $photoList = document.getElementById('photo-list');
    $photoList.innerHTML = '';
    jsonData.images.forEach(function (image) {

        var $imageContainer = generatePhotoFrame(image.imageUrl);
        $imageContainer.onclick = function() {
            fetchAndLoadPhotoDetails(image);
        };

        $photoList.appendChild($imageContainer);
    });

    showPhotoList();
}

// Photo Details Method

function fetchAndLoadPhotoDetails(image) {
    showSpinner();
    selectedImage = image;
    generatePhotoDetails();
}

function generatePhotoDetails() {
    var $photoDetails = document.getElementById('photo-details');
    $photoDetails.innerHTML = '';
    var $imageContainer = generatePhotoFrame(selectedImage.imageUrl);
    $imageContainer.ondblclick = function() {
        favoriteImage(selectedImage.uuid);
    };

    $photoDetails.appendChild($imageContainer);

    showPhotoDetails();
}