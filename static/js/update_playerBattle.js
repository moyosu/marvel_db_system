function updatePlayerBattle(player, battle) {
    // Get the form fields we need to update
    let inputPlayer = document.getElementById('edit-player-track-input');
    let inputBattle = document.getElementById('edit-battle-track-input');

    // Store the previous values in hidden fields
    document.getElementById('prev-player-id').value = player;
    document.getElementById('prev-battle-id').value = battle;

    // Set the values of the form fields
    inputPlayer.value = player;
    inputBattle.value = battle;

    // Show the modal form
    showForm('update');
}

document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    let updatePlayerBattleForm = document.getElementById('edit-player-battle-form-ajax');

    // Add an event listener for the form submission
    updatePlayerBattleForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form fields and their values
        let playerValue = document.getElementById('edit-player-track-input').value;
        let battleValue = document.getElementById('edit-battle-track-input').value;
        let prevPlayerValue = document.getElementById('prev-player-id').value;
        let prevBattleValue = document.getElementById('prev-battle-id').value;

        // Create a data object to send
        let data = {
            player_id: playerValue,
            battle_id: battleValue,
            prev_player_id: prevPlayerValue,
            prev_battle_id: prevBattleValue
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open('PUT', '/playerBattles/put-player-battle-ajax', true);
        xhttp.setRequestHeader('Content-type', 'application/json');

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                    // Refresh the page
                    location.reload();
                } else if (xhttp.status == 409) {
                    alert('Duplicate entry');
                    document.getElementById('edit-player-track-input').value = prevPlayerValue;
                    document.getElementById('edit-battle-track-input').value = prevBattleValue;
                } else {
                    console.error('Error updating player battle: ', xhttp.responseText);
                    alert('There was an error updating the player battle.');
                }
            };
        };
        // Send the request
        xhttp.send(JSON.stringify(data));
    });
});