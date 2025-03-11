// Function to show the delete confirmation modal and set the battle ID
function confirmDelete(battle_id) {
    // Show the modal
    showForm('delete');

    // Display the battle ID in the modal
    document.getElementById('delete-message').textContent = battle_id;

    // Update the delete button to call deleteBattle with the correct ID
    document.getElementById('confirm-delete-button').onclick = function () {
        deleteBattle(battle_id);
    };
}

// Function to delete the battle
function deleteBattle(battle_id) {
    // Put our data we want to send in a javascript object
    let data = {
        battle_id: battle_id
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-battle-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                // Refresh the page to reflect the deletion
                location.reload();
            } else {
                console.error("Error deleting battle: ", xhttp.responseText);
                alert("There was an error deleting the battle.");
            }
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}