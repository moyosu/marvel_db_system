function confirmDelete(character_id, character_name) {
    // Display the Character ID in the modal
    document.getElementById('delete-character-id').value = character_id;
    document.getElementById('delete-character-name').value = character_name;
    
    // Update the delete button to include the character ID
    document.getElementById('confirm-delete-button').onclick = function() {
        deleteCharacter(character_id);
    };
    document.getElementById('delete-character-id').innerText = character_id;
    document.getElementById('delete-character-name').innerText = character_name;
    showForm('delete');
}

function deleteCharacter(character_id) {
    // put our data we want to send in a javascript object
    let data = {
        character_id: character_id
    };

    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', '/characters/delete-character-ajax', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 204) {  // Expecting 204 No Content
                // Refresh the page or update the table to reflect the deletion
                location.reload();
            } else {
                console.log("Error response: ", xhttp.responseText); // Log the error response
            }
        }
    };
    xhttp.send(JSON.stringify(data)); // Send the data
}