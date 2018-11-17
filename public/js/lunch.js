$(document).ready(function () {
    // On page refresh, scroll to top
    $('html, body').animate({ scrollTop: 0 }, 'fast');

    $("#hero-btn").click(function () {
        // On hero button click, scroll to top of form
        $('html, body').animate({ scrollTop: $('.container').offset().top }, 'slow');
    });

    // on make group button, scrolldown form
    $("#make-group-btn").click(function () {
        $("#new-group-form").slideToggle();
        // Hide Find Group form if open
        $("#existing-group-form").slideUp(0);
       //hide intro box if open
       $(".introduction").slideUp(0);
        // Hide Restaurant form if open
        $("#group-form").slideUp(0);
        // Hide Restaurant card if open
        $("#restaurant-card").slideUp(0);
        // Hide all groups form if open
        $("#all-groups").slideUp(0);
    });

    // on find group button, scrolldown form
    $("#existing-group-btn").click(function () {
        $("#existing-group-form").slideToggle();
        // Hide New Group form if open
        $("#new-group-form").slideUp(0);
         //hide intro box if open
         $(".introduction").slideUp(0);
        // Hide Restaurant form if open
        $("#group-form").slideUp(0);
        // Empty group form values if any
        $("#groupName").val("");
        $("#restNames").val("");
        // Hide Restaurant card if open
        $("#restaurant-card").slideUp(0);
        // Hide all groups form if open
        $("#all-groups").slideUp(0);
    });



    // pick random restaurant
    $("#pick-restaurant").click(function() {
        console.log("random is working");
        var group = $("#groupName").text().trim();
        $.get("/api/pickRestaurant/" + group).then(function (data) {
            if (data.length > 0) {
                restaurants = [];
                for (i=0; i<data.length; i++) {
                    restaurants.push(data[i]);
                }
                var restaurant = restaurants[Math.floor(Math.random()*restaurants.length)];
                $("#nameDiv").html("<h4>" + restaurant.restaurant_name + "</h4>"); 
                $("#addrDiv").text(restaurant.address);
                $("#phoneDiv").text(restaurant.phone);
                $("#ratingDiv").text("Rating: " + restaurant.rating);
                $("#photoDiv").empty();
                $("#photoDiv").append('<a href="' + restaurant.website + '" target=_blank><img id="restPhoto" src="'+ restaurant.photo + '" class="restaurant-photo"/></a>');
                $("#restPhoto").attr(restaurant.website);
            } else {
                $("#pick-result").text("No Restaurants have been added to this group.");
            }
        })
    });
});