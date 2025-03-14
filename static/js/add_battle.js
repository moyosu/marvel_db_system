// Add an event listener to the add battle form
document.addEventListener("DOMContentLoaded", function () {
    let addBattleForm = document.getElementById('add-battle-form-ajax');

    if (addBattleForm) {
        addBattleForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent the form from submitting

            // Get form fields
            let timeStamp = document.getElementById('battle-time-stamp-input').value;
            let isVictory = document.getElementById('battle-is-victory-input').value;
            let kills = document.getElementById('battle-kills-input').value;
            let deaths = document.getElementById('battle-deaths-input').value;
            let assists = document.getElementById('battle-assists-input').value;
            let damageDealt = document.getElementById('battle-damage-dealt-input').value;
            let damageBlocked = document.getElementById('battle-damage-blocked-input').value;
            let healing = document.getElementById('battle-healing-input').value;
            let accuracy = document.getElementById('battle-accuracy-input').value;

            // Convert numeric fields to numbers
            kills = parseInt(kills);
            deaths = parseInt(deaths);
            assists = parseInt(assists);
            damageDealt = parseInt(damageDealt);
            damageBlocked = parseInt(damageBlocked);
            healing = parseInt(healing);
            accuracy = parseInt(accuracy);

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
            xhttp.open("POST", "/add-battle-ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4) {
                    if (xhttp.status == 200) {
                        // Reload the page to reflect the changes
                        location.reload();
                    } else {
                        console.error("Error adding battle: ", xhttp.responseText);
                        alert("There was an error adding the battle.");
                    }
                }
            };

            xhttp.send(JSON.stringify(data));
        });
    }
});