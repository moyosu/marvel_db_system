function confirmDelete(player_id, battle_id, player, battle, timestamp) {
    document.getElementById('delete-player-id').value = player_id;
    document.getElementById('delete-battle-id').value = battle_id;
    document.getElementById('delete-player-id').innerText = player;
    document.getElementById('delete-battle-id').innerText = battle;
    document.getElementById('delete-timestamp').innerText = timestamp;
    document.getElementById('confirm-delete-button').onclick = function() {
        deletePlayerBattle(player_id, battle_id);
    };
    showForm('delete');
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
    xhttp.send(JSON.stringify(data));
}