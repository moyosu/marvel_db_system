document.addEventListener("DOMContentLoaded", function () {
    // Get the form element
    let addPlayerForm = document.getElementById('add-player-form-ajax');

    // Add an event listener for the form submission
    addPlayerForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form fields we need to get data from
        let inputPlayerName = document.getElementById("player-name-input");
        let inputPlayerRank = document.getElementById("player-rank-input");

        // Get the values from the form fields
        let playerNameValue = inputPlayerName.value;
        let playerRankValue = inputPlayerRank.value;

        // Create a data object to send
        let data = {
            player_name: playerNameValue,
            rank: playerRankValue
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/players/add-player", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Refresh the window to reflect the new player addition
                location.reload(); 
            } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.");
            }
        };

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));
    });
});