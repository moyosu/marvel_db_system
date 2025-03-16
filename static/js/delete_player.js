function confirmDelete(player_id) {

    // Show the modal
    showForm('delete', player_id);

    // Display the player ID in the modal
    document.getElementById('delete-message').textContent = player_id;

    // Update the delete button to call deletePlayer with the correct ID
    document.getElementById('confirm-delete-button').onclick = function () {
        deletePlayer(player_id);
    };
}

function deletePlayer(player_id) {
    // Put our data we want to send in a javascript object
    let data = {
        player_id: player_id
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/players/delete-player-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            console.log("Response Status: ", xhttp.status); // Log the response status
            if (xhttp.status == 204) {  // Expecting 204 No Content
                // Refresh the page or update the table to reflect the deletion
                location.reload();
            } else {
                console.log("Error response: ", xhttp.responseText); // Log the error response
            }
        }
    };
    console.log("Sending data: ", JSON.stringify(data)); // Log the data being sent
    console.log("Player ID to delete: ", player_id);
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

    hideDeleteModal();
}

function hideDeleteModal() {
    showForm('browse');
}
