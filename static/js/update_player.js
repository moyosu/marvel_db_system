function updatePlayer(player_id, player_name, player_rank) {
    // Populate the form fields with the player data
    document.getElementById('update-player-id-input').value = player_id;
    document.getElementById('update-player-name-input').value = player_name;
    document.getElementById('update-player-rank-input').value = player_rank;

    // Show the modal form
    showForm('update', player_id);
}


// Get the objects we need to modify
let updatePlayerForm = document.getElementById('update-player-form-ajax');

// Modify the objects we need
document.addEventListener("DOMContentLoaded", function() {
    let updatePlayerForm = document.getElementById('update-player-form-ajax');

    // Check if the form exists before adding the event listener
    if (updatePlayerForm) {
        updatePlayerForm.addEventListener("submit", function (e) {
            // Prevent the form from submitting
            e.preventDefault();

            // Get form fields we need to get data from
            let inputPlayerID = document.getElementById("update-player-id-input");
            let inputPlayerName = document.getElementById("update-player-name-input");
            let inputPlayerRank = document.getElementById("update-player-rank-input");

            // Get the values from the form fields
            let playerIDValue = inputPlayerID.value;
            let playerNameValue = inputPlayerName.value;
            let playerRankValue = inputPlayerRank.value;

            // Create a data object to send
            let data = {
                player_id: playerIDValue, // Include player ID
                player_name: playerNameValue,
                rank: playerRankValue
            };

            // Setup our AJAX request
            var xhttp = new XMLHttpRequest();
            xhttp.open("PUT", "/players/put-player-ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");

            // Tell our AJAX request how to resolve
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    // Add the new data to the table
                    location.reload();
                } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                    console.log("There was an error with the input.")
                }
            }

            // Send the request and wait for the response
            xhttp.send(JSON.stringify(data));
        });
    }
});
