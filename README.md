# Crewstagram
#### _Instagram clone for Crew_
Created by Karan Sekhri on July 27, 2018 for Crew application process

The project is a simplified clone of Instagram that we'll call Crewstagram.  The requirements of your finished Crewstagram application are as follows:
* It must be built with only plain old html, css, JavaScript (es5), and jQuery
* It must retrieve all of the images found via a GET request to http://alpha-web.crewapp.com/crewstagram and display them on a main page
* Clicking on an image should bring up an image detail page that displays the image, its comments, and how many favorites it has
* The user should be able to favorite the image from its detail page.  Favoriting is accomplished by sending a POST request to http://alpha-web.crewapp.com/crewstagram/{uuid} where the uuid is the uuid of the image
* The updated count of favorites on the image should be shown to the user
* The user should be able to navigate from an image's detail page back to the main page that displays all of the images
* Navigation to and from an image's detail page should not require a page reload
* It should fulfill all of the above requirements when used in the latest version of Chrome (68.0.3440.75 at time of development)
