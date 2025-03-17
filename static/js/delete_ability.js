// Function to show the delete confirmation modal and set the ability ID
function confirmDelete(ability_id, name) {
    // Show the modal
    showForm('delete');

    // Display the ability ID in the modal
    document.getElementById('delete-message').textContent = ability_id;
    document.getElementById('delete-message-name').textContent = name;

    // Update the delete button to call deleteAbility with the correct ID
    document.getElementById('confirm-delete-button').onclick = function () {
        deleteAbility(ability_id);
    };
}

// Function to delete the ability
function deleteAbility(ability_id) {
    // Put our data we want to send in a javascript object
    let data = {
        ability_id: ability_id
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/abilities/delete-ability-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                // Refresh the page to reflect the deletion
                location.reload();
            } else {
                console.error("Error deleting ability: ", xhttp.responseText);
                alert("There was an error deleting the ability.");
            }
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}