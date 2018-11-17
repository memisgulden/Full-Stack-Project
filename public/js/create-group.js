// POST a new group
$("#submit-new-grp").on("click", function (event) {
    // console.log("submit new is working")
    // Created a newGroup constructor which holds the values submitted from the forms. 
    var newGroup = {
        group_name: $("#new-group").val().trim(),
    };

    // send an AJAX POST request with jQuery
    $.post("/api/newGroup", newGroup)
        //on success, run the following code
        .then(function (data) {
            //log the data we found
            // console.log("group data: ", data);
            var query = newGroup.group_name;
            searchGroup(query);
    // Clear form values
    $("#new-group-form input").val("");
    // Hide New Group form
    $("#new-group-form").slideUp(0);
    // Toggle Restaurant form
    $("#group-form").slideToggle();
        });




});