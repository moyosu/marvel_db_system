function confirmDelete(alliance_id, name) {

    // Show the modal
    showForm('delete', alliance_id);

    // Display the alliance ID in the modal
    document.getElementById('delete-message').textContent = alliance_id;
    document.getElementById('delete-message-name').textContent = name;

    // Update the delete button to call deleteAlliance with the correct ID
    document.getElementById('confirm-delete-button').onclick = function () {
        deleteAlliance(alliance_id);
    };
}

function deleteAlliance(alliance_id) {
    // Put our data we want to send in a javascript object
    let data = {
        alliance_id: alliance_id
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/alliances/delete-alliance-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            console.log("Response Status: ", xhttp.status); // Log the response status
            if (xhttp.status == 200) {  // Expecting 204 No Content
                // Refresh the page or update the table to reflect the deletion
                location.reload();
            } else {
                console.log("Error response: ", xhttp.responseText); // Log the error response
            }
        }
    };
    console.log("Sending data: ", JSON.stringify(data)); // Log the data being sent
    console.log("Alliance ID to delete: ", alliance_id);
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

    hideDeleteModal();
}

function hideDeleteModal() {
    showForm('browse');
}