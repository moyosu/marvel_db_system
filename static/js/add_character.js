document.addEventListener("DOMContentLoaded", function () {
    // Get the form element
    let addCharacterForm = document.getElementById('add-character-form-ajax');

    // Add an event listener for the form submission
    addCharacterForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form fields we need to get data from
        let inputCharacterName = document.getElementById("character-name-input");
        let inputCharacterRole = document.getElementById("character-role-input");
        let inputCharacterHealth = document.getElementById("character-health-input");
        let inputCharacterHasSecondaryWeapon = document.getElementById("character-secondary-weapon-input");
        let inputCharacterMoveSpeed = document.getElementById("character-move-speed-input");
        let inputCharacterCriticalMultiplier = document.getElementById("character-critical-multiplier-input");
        let inputCharacterAmmoCapacity = document.getElementById("character-ammo-capacity-input");
        let inputCharacterAlliance = document.getElementById("character-track-alliance-input");

        // Get the values from the form fields
        let characterNameValue = inputCharacterName.value;
        let characterRoleValue = inputCharacterRole.value;
        let characterHealthValue = inputCharacterHealth.value;
        let characterHasSecondaryWeaponValue = inputCharacterHasSecondaryWeapon.value;
        let characterMoveSpeedValue = inputCharacterMoveSpeed.value;
        let characterCriticalMultiplierValue = inputCharacterCriticalMultiplier.value;
        let characterAmmoCapacityValue = inputCharacterAmmoCapacity.value;
        let characterAllianceValue = inputCharacterAlliance.value;

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
        xhttp.open("POST", "/add-character", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Parse the response
                let response = JSON.parse(xhttp.responseText);

                // Add the new row to the table
                // addRowToTable(response);

                // Clear the input fields
                inputCharacterName.value = '';
                inputCharacterRole.value = '';
                inputCharacterHealth.value = '';
                inputCharacterHasSecondaryWeapon.value = '';
                inputCharacterMoveSpeed.value = '';
                inputCharacterCriticalMultiplier.value = '';
                inputCharacterAmmoCapacity.value = '';
                inputCharacterAlliance.value = '';
                
                // Refresh the window to reflect the new character addition
                location.reload(); 
                // Hide the form
                showForm('browse');
            } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                alert("There was an error with the input.");
                console.log("There was an error with the input.");
            }
        };

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));
    });
});