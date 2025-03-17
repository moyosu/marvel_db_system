document.addEventListener("DOMContentLoaded", function () {
    // Get the form element
    let addCharacterForm = document.getElementById('add-character-form-ajax');

    // Add an event listener for the form submission
    addCharacterForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        // Get the values from the form fields
        let characterNameValue = document.getElementById("character-name-input").value;
        let characterRoleValue = document.getElementById("character-role-input").value;
        let characterHealthValue = document.getElementById("character-health-input").value;
        let characterHasSecondaryWeaponValue = document.getElementById("character-secondary-weapon-input").value;
        let characterMoveSpeedValue = document.getElementById("character-move-speed-input").value;
        let characterCriticalMultiplierValue = document.getElementById("character-critical-multiplier-input").value;
        let characterAmmoCapacityValue = document.getElementById("character-ammo-capacity-input").value;
        let characterAllianceValue = document.getElementById("character-track-alliance-input").value;

        if (characterHealthValue < 1 || characterHealthValue > 9999) {
            inputCharacterHealth.value = '';
            alert("Please enter a valid number between 1 and 100 for the character's health.");
            return;
        }

        if (characterMoveSpeedValue < 1 || characterMoveSpeedValue > 10) {
            characterMoveSpeedValue.value = '';
            alert("Please enter a valid number between 1 and 10 for the character's move speed.");
            return;
        }

        if (characterCriticalMultiplierValue < 0 || characterCriticalMultiplierValue > 100) {
            characterCriticalMultiplierValue.value = '';
            alert("Please enter a valid number between 0 and 100 for the character's critical multiplier.");
            return;
        }

        if (characterAmmoCapacityValue < 0 || characterAmmoCapacityValue > 9999) {
            characterAmmoCapacityValue.value = '';
            alert("Please enter a valid number between 0 and 9999 for the character's health.");
            return;
        }

        // Create a data object to send
        let data = {
            character_name: characterNameValue,
            role: characterRoleValue,
            health: characterHealthValue,
            has_secondary_weapon: characterHasSecondaryWeaponValue,
            move_speed: characterMoveSpeedValue,
            critical_multiplier: characterCriticalMultiplierValue,
            ammo_capacity: characterAmmoCapacityValue,
            track_alliance: characterAllianceValue
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/characters/add-character", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Refresh the window to reflect the new character addition
                location.reload(); 
            } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                alert("There was an error with the input.");
                console.log("There was an error with the input.");
            }
        };
        console.log(JSON.stringify(data));
        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));
    });
});