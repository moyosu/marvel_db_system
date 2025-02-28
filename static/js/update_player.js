function updatePlayer(player_id) {
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
            xhttp.open("PUT", "/put-player-ajax", true);
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

// function updateRow(data, personID){
//     let parsedData = JSON.parse(data);
    
//     let table = document.getElementById("people-table");

//     for (let i = 0, row; row = table.rows[i]; i++) {
//        //iterate through rows
//        //rows would be accessed using the "row" variable assigned in the for loop
//        if (table.rows[i].getAttribute("data-value") == personID) {

//             // Get the location of the row where we found the matching person ID
//             let updateRowIndex = table.getElementsByTagName("tr")[i];

//             // Get td of homeworld value
//             let td = updateRowIndex.getElementsByTagName("td")[3];

//             // Reassign homeworld to our value we updated to
//             td.innerHTML = parsedData[0].name; 
//        }
//     }
// }


