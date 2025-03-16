// Function to populate the update form with the selected battle's data
function updateBattle(battle_id, time_stamp, is_victory, kills, deaths, assists, damage_dealt, damage_blocked, healing, accuracy) {
    
    let date = new Date(time_stamp); // Parse the timestamp into a Date object
    let formattedTimestamp = date.toISOString().slice(0, 16); // Convert to YYYY-MM-DDTHH:MM format

    // Populate the form fields
    document.getElementById('edit-battle-id-input').value = battle_id;
    document.getElementById('edit-time-stamp-input').value = formattedTimestamp;

    document.getElementById('edit-battle-id-input').value = battle_id;
    document.getElementById('edit-time-stamp-input').value = formattedTimestamp;
    document.getElementById('edit-is-victory-input').value = is_victory;
    document.getElementById('edit-kills-input').value = kills;
    document.getElementById('edit-deaths-input').value = deaths;
    document.getElementById('edit-assists-input').value = assists;
    document.getElementById('edit-damage-dealt-input').value = damage_dealt;
    document.getElementById('edit-damage-blocked-input').value = damage_blocked;
    document.getElementById('edit-healing-input').value = healing;
    document.getElementById('edit-accuracy-input').value = accuracy;

    // Show the update form
    showForm('update');
}

// Add an event listener to the update battle form
document.addEventListener("DOMContentLoaded", function () {
    let updateBattleForm = document.getElementById('update-battle-form-ajax');

    if (updateBattleForm) {
        updateBattleForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent the form from submitting

            // Get form fields
            let battleID = document.getElementById('edit-battle-id-input').value;
            let timeStamp = document.getElementById('edit-time-stamp-input').value;
            let isVictory = document.getElementById('edit-is-victory-input').value;
            let kills = document.getElementById('edit-kills-input').value;
            let deaths = document.getElementById('edit-deaths-input').value;
            let assists = document.getElementById('edit-assists-input').value;
            let damageDealt = document.getElementById('edit-damage-dealt-input').value;
            let damageBlocked = document.getElementById('edit-damage-blocked-input').value;
            let healing = document.getElementById('edit-healing-input').value;
            let accuracy = document.getElementById('edit-accuracy-input').value;

            // Validate numeric fields to ensure they are not less than 0
            if (
                kills < 0 ||
                deaths < 0 ||
                assists < 0 ||
                damageDealt < 0 ||
                damageBlocked < 0 ||
                healing < 0 ||
                accuracy < 0
            ) {
                alert("Numeric fields (Kills, Deaths, Assists, Damage Dealt, Damage Blocked, Healing, Accuracy) cannot be less than 0.");
                return; // Stop the form submission if validation fails
            }
            
            // Create a data object to send
            let data = {
                battle_id: battleID,
                time_stamp: timeStamp,
                is_victory: isVictory,
                kills: kills,
                deaths: deaths,
                assists: assists,
                damage_dealt: damageDealt,
                damage_blocked: damageBlocked,
                healing: healing,
                accuracy: accuracy
            };

            // Send the AJAX request
            let xhttp = new XMLHttpRequest();
            xhttp.open("PUT", "/battles/put-battle-ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4) {
                    if (xhttp.status == 200) {
                        // Reload the page to reflect the changes
                        location.reload();
                    } else {
                        console.error("Error updating battle: ", xhttp.responseText);
                        alert("There was an error updating the battle.");
                    }
                }
            };

            xhttp.send(JSON.stringify(data));
        });
    }
});