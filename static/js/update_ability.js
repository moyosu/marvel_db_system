function updateAbility(ability_id, ability_name, special_effect, ability_range, cooldown, charges, track_character) {
    // Populate the form fields
    document.getElementById('edit-ability-id-input').value = ability_id;
    document.getElementById('edit-ability-name-input').value = ability_name;
    document.getElementById('edit-special-effect-input').value = special_effect;
    document.getElementById('edit-ability-range-input').value = ability_range;
    document.getElementById('edit-cooldown-input').value = cooldown;
    document.getElementById('edit-charges-input').value = charges;

    // Get the select element for Track Character
    let selectElement = document.getElementById('edit-track-character-input');
    
    // Loop through the options and set the correct one as selected
    for (let option of selectElement.options) {
        if (option.text === track_character) {
            option.selected = true;
            break;
        }
    }

    // Show the update form
    showForm('update');
}

// Add an event listener to the update form
document.addEventListener("DOMContentLoaded", function () {
    let updateAbilityForm = document.getElementById('edit-ability-form-ajax');

    if (updateAbilityForm) {
        updateAbilityForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent the form from submitting

            // Get form fields
            let abilityID = document.getElementById('edit-ability-id-input').value;
            let abilityName = document.getElementById('edit-ability-name-input').value;
            let specialEffect = document.getElementById('edit-special-effect-input').value;
            let abilityRange = document.getElementById('edit-ability-range-input').value;
            let cooldown = document.getElementById('edit-cooldown-input').value;
            let charges = document.getElementById('edit-charges-input').value;
            let trackCharacter = document.getElementById('edit-track-character-input').value;

            // Create a data object to send
            let data = {
                ability_id: abilityID,
                ability_name: abilityName,
                special_effect: specialEffect,
                ability_range: abilityRange,
                cooldown: cooldown,
                charges: charges,
                track_character: trackCharacter
            };

            // Send the AJAX request
            let xhttp = new XMLHttpRequest();
            xhttp.open("PUT", "/abilities/put-ability-ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4) {
                    if (xhttp.status == 200) {
                        // Reload the page to reflect the changes
                        location.reload();
                    } else {
                        console.error("Error updating ability: ", xhttp.responseText);
                        alert("There was an error updating the ability.");
                    }
                }
            };

            xhttp.send(JSON.stringify(data));
        });
    }
});