function updateBattleParticipant(battle, character) {
    // Get the form fields we need to update
    let inputBattle = document.getElementById('edit-battle-track-input');
    let inputCharacter = document.getElementById('edit-character-track-input');

    // Store the previous values in hidden fields
    document.getElementById('prev-battle-id').value = battle;
    document.getElementById('prev-character-id').value = character;

    // Set the values of the form fields
    inputBattle.value = battle;
    inputCharacter.value = character;

    // Show the modal form
    showForm('update');
}

document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    let updateBattleParticipantForm = document.getElementById('edit-battle-participant-form-ajax');

    // Add an event listener for the form submission
    updateBattleParticipantForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form fields and their values
        let battleValue = document.getElementById('edit-battle-track-input').value;
        let characterValue = document.getElementById('edit-character-track-input').value;
        let prevBattleValue = document.getElementById('prev-battle-id').value;
        let prevCharacterValue = document.getElementById('prev-character-id').value;

        // Create a data object to send
        let data = {
            battle: battleValue,
            character: characterValue,
            prev_battle: prevBattleValue,
            prev_character: prevCharacterValue
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open('PUT', '/battleParticipants/update-battle-participant', true);
        xhttp.setRequestHeader('Content-type', 'application/json');

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                    // refresh the page
                    location.reload();
                } else if (xhttp.status == 409) {
                    alert('Duplicate entry');
                    document.getElementById('edit-battle-track-input').value = document.getElementById('edit-battle-track-input').options[0].value;
                    document.getElementById('edit-character-track-input').value = document.getElementById('edit-character-track-input').options[0].value;
                }
                else {
                    console.error('Error updating battle participant: ', xhttp.responseText);
                    alert('There was an error updating the battle participant.');
                }

            }
        };
        // Send the request
        xhttp.send(JSON.stringify(data));
    });
});
