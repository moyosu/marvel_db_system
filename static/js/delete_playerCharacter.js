function confirmDelete(player_id, character_id, player, character) {
    document.getElementById('delete-player-id').value = player_id;
    document.getElementById('delete-character-id').value = character_id;
    document.getElementById('confirm-delete-button').onclick = function() {
        deletePlayerCharacter(player_id, character_id);
    };
    document.getElementById('delete-player-id').innerText = player;
    document.getElementById('delete-character-id').innerText = character;
    showForm('delete', player_id, character_id);
}

function deletePlayerCharacter(player_id, character_id) {
    let data = {
        player_id: player_id,
        character_id: character_id
    };

    let xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', '/playerCharacters/delete-player-character-ajax', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {
            console.log("Response Status: ", xhttp.status);
            if (xhttp.status == 204) {
                location.reload();
            } else {
                console.log("Error response: ", xhttp.responseText);
            }
        }
    };

    console.log("Sending data: ", data);
    console.log("Player ID: ", player_id);
    console.log("Character ID: ", character_id);
    xhttp.send(JSON.stringify(data));

    showForm('browse');
}