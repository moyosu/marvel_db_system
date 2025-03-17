document.addEventListener('DOMContentLoaded', function () {
    let addBattleParticipantForm = document.getElementById('add-battle-participant-form-ajax');

    addBattleParticipantForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let inputBattle = document.getElementById('battle-track-input');
        let inputCharacter = document.getElementById('character-track-input');

        let data = {
            battle: inputBattle.value,
            character: inputCharacter.value
        };

        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/battleParticipants/add-battle-participant', true);
        xhttp.setRequestHeader('Content-type', 'application/json');

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                inputBattle.value = document.getElementById('battle-track-input').options[0].value;
                inputCharacter.value = document.getElementById('character-track-input').options[0].value;
            }
        };
        location.reload();
        xhttp.send(JSON.stringify(data));
    });
});