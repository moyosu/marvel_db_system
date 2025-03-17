function updatePlayerCharacter(player, character) {
    // Get the form fields we need to update
    let inputPlayer = document.getElementById('edit-player-track-input');
    let inputCharacter = document.getElementById('edit-character-track-input');

    // Store the previous values in hidden fields
    document.getElementById('prev-player-id').value = player;
    document.getElementById('prev-character-id').value = character;

    // Set the values of the form fields
    inputPlayer.value = player;
    inputCharacter.value = character;

    // Show the modal form
    showForm('update');
}

document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    let updatePlayerCharacterForm = document.getElementById('edit-player-character-form-ajax');

    // Add an event listener for the form submission
    updatePlayerCharacterForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form fields and their values
        let playerValue = document.getElementById('edit-player-track-input').value;
        let characterValue = document.getElementById('edit-character-track-input').value;
        let prevPlayerValue = document.getElementById('prev-player-id').value;
        let prevCharacterValue = document.getElementById('prev-character-id').value;

        // Create a data object to send
        let data = {
            player_id: playerValue,
            character_id: characterValue,
            prev_player_id: prevPlayerValue,
            prev_character_id: prevCharacterValue
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open('PUT', '/playerCharacters/put-player-character-ajax', true);
        xhttp.setRequestHeader('Content-type', 'application/json');

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                    // refresh the page
                    location.reload();
                } else if (xhttp.status == 409) {
                    alert('Duplicate entry');
                    document.getElementById('edit-player-track-input').value = prevPlayerValue;
                    document.getElementById('edit-character-track-input').value = prevCharacterValue;
                }
                else {
                    console.error('Error updating player character: ', xhttp.responseText);
                    alert('There was an error updating the player character.');

                }
            };
        };
        // Send the request
        xhttp.send(JSON.stringify(data));
    });
});
