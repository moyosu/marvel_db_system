function confirmDelete(battle_id, time_stamp, character_id, character) {
    document.getElementById('delete-battle-id').value = battle_id;
    document.getElementById('delete-character-id').value = character_id;
    document.getElementById('confirm-delete-button').onclick = function () {
        deleteBattleParticipant(battle_id, character_id);
    };
    document.getElementById('delete-battle-id').innerText = battle_id + "\n" + time_stamp;
    document.getElementById('delete-character-id').innerText = character;
    showForm('delete');
}

function deleteBattleParticipant(battle_id, character_id) {
    let data = {
        battle_id: battle_id,
        character_id: character_id
    };

    let xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', '/battleParticipants/delete-battle-participant-ajax', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            location.reload();
        }
    };
    xhttp.send(JSON.stringify(data));
}
