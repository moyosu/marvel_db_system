document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    let addPlayerCharacterForm = document.getElementById('add-player-character-form-ajax');

    // Add an event listener for the form submission
    addPlayerCharacterForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form fields we need to get data from
        let inputPlayer = document.getElementById('player-track-input');
        let inputCharacter = document.getElementById('character-track-input');

        // Get the values from the form fields
        let playerValue = inputPlayer.value;
        let characterValue = inputCharacter.value;

        // Create a data object to send
        let data = {
            player: playerValue,
            character: characterValue
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/playerCharacters/add-player-character', true);
        xhttp.setRequestHeader('Content-type', 'application/json');

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Parse the response
                let response = JSON.parse(xhttp.responseText);

                // Clear the input fields
                inputPlayer.value = '';
                inputCharacter.value = '';

                // refresh the page
                // location.reload();
                showForm('browse');
            }
        };

        // Send the request
        xhttp.send(JSON.stringify(data));
    });
});