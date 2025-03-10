function updateCharacter(character_id, character_name, character_role, character_health, has_secondary_weapon, move_speed, critical_multiplier, ammo_capacity, track_alliance) {
    // populate the form with the existing values
    document.getElementById('edit-character-id-input').value = character_id;
    document.getElementById('edit-character-name-input').value = character_name;
    document.getElementById('edit-character-role-input').value = character_role;
    document.getElementById('edit-character-health-input').value = character_health;
    document.getElementById('character-secondary-weapon-input').value = has_secondary_weapon;
    if (document.getElementById('character-secondary-weapon-input').value == "true") {
        has_secondary_weapon = 1;
    } else {
        has_secondary_weapon = 0;
    }
    document.getElementById('edit-character-move-speed-input').value = move_speed;
    document.getElementById('edit-character-critical-multiplier-input').value = critical_multiplier;
    document.getElementById('edit-character-ammo-capacity-input').value = ammo_capacity;
    let allianceSelect = document.getElementById('character-track-alliance-input');
    for (let i = 0; i < allianceSelect.options.length; i++) {
        console.log(allianceSelect.options[i].text, track_alliance);
        if (allianceSelect.options[i].text == track_alliance) {
            console.log(allianceSelect.options[i].text, "found it");
            allianceSelect.selectedIndex = i;
            document.getElementById('character-track-alliance-input').value = i;
            console.log(document.getElementById('character-track-alliance-input').value, i);
            break;
        }
    }
    // Show the modal form
    showForm('update', character_id);
}

function updateSelectedAlliance(selectedIndex) {
    console.log("selected index", selectedIndex);
    document.getElementById('character-track-alliance-input').selectedIndex = selectedIndex;
}

// Modify the objects we need
document.addEventListener("DOMContentLoaded", function () {
    let updateCharacterForm = document.getElementById('update-character-form-ajax');

    // Check if the form exists before adding the event listener
    if (updateCharacterForm) {
        updateCharacterForm.addEventListener("submit", function (e) {
            // Prevent the form from submitting
            e.preventDefault();

            // Get form fields we need to get data from
            let inputCharacterID = document.getElementById("edit-character-id-input");
            let inputCharacterName = document.getElementById("edit-character-name-input");
            let inputCharacterRole = document.getElementById("edit-character-role-input");
            let inputCharacterHealth = document.getElementById("edit-character-health-input");
            let inputCharacterHasSecondaryWeapon = document.getElementById("character-secondary-weapon-input");
            let inputCharacterMoveSpeed = document.getElementById("edit-character-move-speed-input");
            let inputCharacterCriticalMultiplier = document.getElementById("edit-character-critical-multiplier-input");
            let inputCharacterAmmoCapacity = document.getElementById("edit-character-ammo-capacity-input");
            let inputCharacterAlliance = document.getElementById("character-track-alliance-input");

            console.log("alliance input", inputCharacterAlliance);
            // Get the values from the form fields
            let characterIDValue = inputCharacterID.value;
            let characterNameValue = inputCharacterName.value;
            let characterRoleValue = inputCharacterRole.value;
            let characterHealthValue = inputCharacterHealth.value;
            let characterHasSecondaryWeaponValue = inputCharacterHasSecondaryWeapon.value == "true" ? "1" : "0";
            let characterMoveSpeedValue = inputCharacterMoveSpeed.value;
            let characterCriticalMultiplierValue = inputCharacterCriticalMultiplier.value;
            let characterAmmoCapacityValue = inputCharacterAmmoCapacity.value;
            let characterAllianceValue = inputCharacterAlliance.value;
            if (characterAllianceValue == "-1") {
                characterAllianceValue = 0;
            }
            console.log("alliance value", characterAllianceValue);
            // Create a data object to send
            let data = {
                character_id: characterIDValue, // Include character ID
                character_name: characterNameValue,
                role: characterRoleValue,
                health: characterHealthValue,
                has_secondary_weapon: characterHasSecondaryWeaponValue,
                move_speed: characterMoveSpeedValue,
                critical_multiplier: characterCriticalMultiplierValue,
                ammo_capacity: characterAmmoCapacityValue,
                track_alliance: characterAllianceValue
            };

            console.log(data);

            // Setup our AJAX request
            var xhttp = new XMLHttpRequest();
            xhttp.open("PUT", "/put-character-ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");

            // Tell our AJAX request how to resolve
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    // Add the new data to the table
                    location.reload();
                } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                    console.log("There was an error with the input.")
                }
            }
            // Send the request and wait for the response
            xhttp.send(JSON.stringify(data));
        });
    }
});