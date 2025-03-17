document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    let addPlayerBattleForm = document.getElementById('add-player-battle-form-ajax');

    // Add an event listener for the form submission
    addPlayerBattleForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form fields we need to get data from
        let inputPlayer = document.getElementById('player-track-input');
        let inputBattle = document.getElementById('battle-track-input');

        // Get the values from the form fields
        let playerValue = inputPlayer.value;
        let battleValue = inputBattle.value;

        // Create a data object to send
        let data = {
            player: playerValue,
            battle: battleValue
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/playerBattles/add-player-battle', true);
        xhttp.setRequestHeader('Content-type', 'application/json');

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                    // refresh the page
                    location.reload();
                } else if (xhttp.status == 409) {
                    alert('Duplicate entry');
                    document.getElementById('player-track-input').value = document.getElementById('player-track-input').options[0].value;
                    document.getElementById('battle-track-input').value = document.getElementById('battle-track-input').options[0].value;
                } else {
                    console.error('Error adding player battle: ', xhttp.responseText);
                    alert('There was an error adding the player battle.');
                }
            }
        };
        // Send the request
        xhttp.send(JSON.stringify(data));
    });
});