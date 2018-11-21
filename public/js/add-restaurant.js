//Declare global variables for Google Autocomplete 
var globalCity;
var globalState;

//Google Maps Autocomplete
var input = document.getElementById('location');
var autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['(cities)']
});

google.maps.event.addListener(autocomplete, 'place_changed', function () {
    var place = autocomplete.getPlace();
    var city = place.address_components[0].short_name;
    var state = place.address_components[2].short_name;
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    globalCity = city;
    globalState = state;
});

//Function to build the Yelp API call based on user suggestion
function yelpSearchSettings(restaurant) {
    return {
        "async": true,
        "crossDomain": true,
        "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + globalCity + "," + globalState + "&term=" + restaurant + "&limit=8",
        "method": "GET",
        "headers": {
            "authorization": "Bearer oeynnpah_nrXM22tcKQbp6M24O0ujSkbSpJ9SX-3dRRkQRCYelcm4u0QhT2tcnl1JUe_1tqwXD33D108aV2SuQRY9CFQ5Hysvh6vG10S3l9T689InKqldpMUS6vpW3Yx",
            "Cache-Control": "no-cache",
        }
    }
};

// POST a new restaurant to a group
$("#submit-pick").click(function () {
    event.preventDefault();
    searchYelp();
});

// YELP SEARCH - calls Yelp API when a user enters a location and restaurant
function searchYelp() {
    //Grab user input
    var restaurant = $("#restaurant-name").val().trim();
    //Empty all form values
    //$("#group-form input").val("");
    var settings = yelpSearchSettings(restaurant);
    //Initiating Ajax call
    $.ajax(settings).done(function (response) {
        //Returns Yelp JSON for a restaurant 
        var data = response.businesses[0];
        parseYelp(data);
        console.log(data);
    })
};

// Parse Yelp API Data
function parseYelp(data) {
    var name = data.name;
    var address = data.location.display_address[0];
    var phone = data.display_phone;
    var rating = data.rating;
    var photo = data.image_url;
    var website = data.url;
    console.log(data);
    restaurantDB(name, address, phone, rating, photo, website);
};


//Function to parse Yelp API restaurant json to database
function restaurantDB(name, address, phone, rating, photo, website) {
    var restaurant = {
        user_name: $("#username").val().trim(),
        group_name: $("#groupName").text().trim(),
        restaurant_name: name,
        address: address,
        phone: phone,
        rating: rating,
        photo: photo,
        website: website,
    }
    // POST restaurant data to database
    $.post("/api/newRestaurant", restaurant)

        .then(function (data) {
            console.log("yelp api data saved to db: ", data);
            $("#username").val(""); 
            $("#location").val(""); 
            $("#restaurant-name").val("");
            // Saving for later use with Loading Button CSS
            // $("#submit-pick").removeClass("ld ld-over-full-inverse running");
        })
};