// Search for group - populates group name and its restaurants
// OR searches for all groups if nothing is entered
$("#find-group").click(function () {
    $("#allGroupsList").empty();
    var query = $('#existing-group').val().trim();
    searchGroup(query);
});

// Find a specific group
function searchGroup(query) {
    var search = "/api/groups"

    // if a group name was entered, search for group in db
    if (query.length > 0)
        search += "/" + query;
    $.get(search).then(function (data) {

        // console.log(data);
        //Later: add error div for no results found.
        
        if (data.length == 0)
            return;
        // Hide Find Group form
        $("#existing-group-form").slideUp(0);
        // Hide Restaurant form
        $("#group-form").slideUp(0);
        if (query.length > 0) {
            // put group name into #groupName span 
            $("#groupName").html("<p id='groupP'>" + query + "</p>");
            // parse username data into #userNames span
            userList = [];
            for (i = 0; i < data.length; i++) {
                userList.push(data[i].user_name);
            }
            var splitUser = userList.join(" ");
            $("#userNames").text(splitUser);
            $("#user-list").show();
            $("#group-form").slideToggle();
        // ELSE if no group name was entered, find all groups
        } else {
            $("#all-groups").slideToggle();
            //// Make a div for each group and add to #all-groups form under #allGroupsList div
            for (i = 0; i < data.length; i++) {
                var div = $("<div class='allGroupsItem'>");
                var group = data[i].group_name;
                var btn = $("<button class='allGroupsItemBtn'>");
                btn.text(group);
                div.append(btn);
                $("#allGroupsList").append(div);
                // add event listener for buttons 
                btn.click(function () {
                    $("#all-groups").slideUp(0);
                    var query = this.innerHTML;
                    searchGroup(query);
                })
                $("#mapContainer").show();
            }
        }
    })
};