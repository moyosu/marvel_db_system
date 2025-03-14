function confirmDelete(character_id) {
    // show the modal
    showForm('delete', character_id);
    console.log("Character ID: ", character_id); // Log the character ID
    // Display the Character ID in the modal
    document.getElementById('delete-message').value = character_id;
    
    // Update the delete button to include the character ID
    document.getElementById('confirm-delete-button').onclick = function() {
        deleteCharacter(character_id);
    };
}

function deleteCharacter(character_id) {
    // put our data we want to send in a javascript object
    let data = {
        character_id: character_id
    };

    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', 'delete-character-ajax', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = function() {
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
    console.log("Sending data: ", data); // Log the data we are sending
    console.log("Character ID: ", character_id); // Log the character ID
    xhttp.send(JSON.stringify(data)); // Send the data
    
    hideDeleteModal(); // Hide the modal
}

function hideDeleteModal() {
    showForm('browse');
}