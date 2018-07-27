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

// Single page navigation, hiding and showing content
function hideMainItems() {
    document.querySelectorAll('.main-content-container').forEach(function($node) {
        $node.classList.add('hidden');
    });
}

function showPhotoList() {
    hideMainItems();
    document.getElementById('photo-list').classList.remove('hidden');
}

function showPhotoDetails() {
    hideMainItems();
    document.getElementById('photo-details').classList.remove('hidden');
}

function showSpinner() {
    hideMainItems();
    document.getElementById('spinner').classList.remove('hidden');
}

// Entry point

function onLoad() {
    fetchAndLoadPhotoList();
}

// Photo List methods

function fetchAndLoadPhotoList() {
    getData('http://alpha-web.crewapp.com/crewstagram', generatePhotoList);
}

function generatePhotoList(jsonData) {
    var $photoList = document.getElementById('photo-list');
    jsonData.images.forEach(function (image) {
        var $imageContainer = document.createElement('div');
        $imageContainer.classList.add('image-list-image-container');
        var $image = document.createElement('img');
        $image.classList.add('image-list-image');
        $image.src = image.imageUrl;

        $imageContainer.appendChild($image);
        $photoList.appendChild($imageContainer);
    });
    showPhotoList();
    console.log(jsonData);
}