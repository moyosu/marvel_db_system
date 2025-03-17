function confirmDelete(player_id, battle_id, player, battle) {
    document.getElementById('delete-player-id').value = player_id;
    document.getElementById('delete-battle-id').value = battle_id;
    document.getElementById('confirm-delete-button').onclick = function() {
        deletePlayerBattle(player_id, battle_id);
    };
    document.getElementById('delete-player-id').innerText = player;
    document.getElementById('delete-battle-id').innerText = battle;
    showForm('delete', player_id, battle_id);
}

function deletePlayerBattle(player_id, battle_id) {
    let data = {
        player_id: player_id,
        battle_id: battle_id
    };

    let xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', '/playerBattles/delete-player-battle-ajax', true);
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
    console.log("Battle ID: ", battle_id);
    xhttp.send(JSON.stringify(data));

    showForm('browse');
}