function updateCharacter(character_id, character_name, character_role, character_health, has_secondary_weapon, move_speed, critical_multiplier, ammo_capacity, track_alliance) {
    // populate the form with the existing values
    document.getElementById('edit-character-id-input').value = character_id;
    document.getElementById('edit-character-name-input').value = character_name;
    document.getElementById('edit-character-role-input').value = character_role;
    document.getElementById('edit-character-health-input').value = character_health;
    document.getElementById('edit-character-secondary-weapon-input').value = has_secondary_weapon;
    document.getElementById('edit-character-move-speed-input').value = move_speed;
    document.getElementById('edit-character-critical-multiplier-input').value = critical_multiplier;
    document.getElementById('edit-character-ammo-capacity-input').value = ammo_capacity;
    let allianceSelect = document.getElementById('edit-character-track-alliance-input');
    for (let i = 0; i < allianceSelect.options.length; i++) {
        if (allianceSelect.options[i].text == track_alliance) {
            document.getElementById('edit-character-track-alliance-input').options[i].selected = true;
            break;
        } else if (allianceSelect.options[i].text == "None") {
            document.getElementById('edit-character-track-alliance-input').options[i].selected = true;
            break;
        }
    }
    // Show the modal form
    showForm('update');
}

// Modify the objects we need
document.addEventListener("DOMContentLoaded", function () {
    let updateCharacterForm = document.getElementById('update-character-form-ajax');

    updateCharacterForm.addEventListener("submit", function (e) {
        // Prevent the form from submitting
        e.preventDefault();

        // Get form field values we need to get data
        let inputCharacterIDValue = document.getElementById("edit-character-id-input").value;
        let inputCharacterNameValue = document.getElementById("edit-character-name-input").value;
        let inputCharacterRoleValue = document.getElementById("edit-character-role-input").value;
        let inputCharacterHealthValue = document.getElementById("edit-character-health-input").value;
        let inputCharacterHasSecondaryWeaponValue = document.getElementById("edit-character-secondary-weapon-input").value;
        let inputCharacterMoveSpeedValue = document.getElementById("edit-character-move-speed-input").value;
        let inputCharacterCriticalMultiplierValue = document.getElementById("edit-character-critical-multiplier-input").value;
        let inputCharacterAmmoCapacityValue = document.getElementById("edit-character-ammo-capacity-input").value;
        let inputCharacterAllianceValue = document.getElementById("edit-character-track-alliance-input").value;

        if (inputCharacterHealthValue < 1 || inputCharacterHealthValue > 9999) {
            document.getElementById("edit-character-health-input").value = '';
            alert("Please enter a valid number between 1 and 9999 for the character's health.");
            return;
        }

        if (inputCharacterMoveSpeedValue < 1 || inputCharacterMoveSpeedValue > 10) {
            document.getElementById("edit-character-move-speed-input").value = '';
            alert("Please enter a valid number between 1 and 10 for the character's move speed.");
            return;
        }

        if (inputCharacterCriticalMultiplierValue < 0 || inputCharacterCriticalMultiplierValue > 100) {
            document.getElementById("edit-character-critical-multiplier-input").value = '';
            alert("Please enter a valid number between 0 and 100 for the character's critical multiplier.");
            return;
        }

        if (inputCharacterAmmoCapacityValue < 0 || inputCharacterAmmoCapacityValue > 9999) {
            document.getElementById("edit-character-ammo-capacity-input").value = '';
            alert("Please enter a valid number between 0 and 9999 for the character's ammo capacity.");
            return;
        }
        // Create a data object to send
        let data = {
            character_id: inputCharacterIDValue, // Include character ID
            character_name: inputCharacterNameValue,
            role: inputCharacterRoleValue,
            health: inputCharacterHealthValue,
            has_secondary_weapon: inputCharacterHasSecondaryWeaponValue,
            move_speed: inputCharacterMoveSpeedValue,
            critical_multiplier: inputCharacterCriticalMultiplierValue,
            ammo_capacity: inputCharacterAmmoCapacityValue,
            track_alliance: inputCharacterAllianceValue
        };

        console.log(data);

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/characters/put-character-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Add the new data to the table
                location.reload();
                showForm('browse');
            } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }
        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));
    });
});