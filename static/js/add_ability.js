document.addEventListener("DOMContentLoaded", function () {
    // Get the form element
    let addAbilityForm = document.getElementById('add-ability-form-ajax');

    // Add an event listener for the form submission
    addAbilityForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form fields we need to get data from
        let abilityNameInput = document.getElementById("ability-name-input");
        let specialEffectInput = document.getElementById("special-effect-input");
        let abilityRangeInput = document.getElementById("ability-range-input");
        let cooldownInput = document.getElementById("cooldown-input");
        let chargesInput = document.getElementById("charges-input");
        let trackCharacterInput = document.getElementById("track-character-input");

        // Get the values from the form fields
        let abilityNameValue = abilityNameInput.value;
        let specialEffectValue = specialEffectInput.value;
        let abilityRangeValue = abilityRangeInput.value;
        let cooldownValue = cooldownInput.value;
        let chargesValue = chargesInput.value;
        let trackCharacterValue = trackCharacterInput.value;

        if (
            abilityRangeValue < 0 ||
            cooldownValue < 0 ||
            chargesValue < 0 
        ) {
            // Citation for the following code below:
            // Date: 03/17/2025
            // Adapted from: Stack Overflow
            // Source URL: https://stackoverflow.com/questions/15072302/javascript-alert-statement-with-string-int
            // Purpose: This was used to guide the user when they provide infromation about the ability to be added. 
            alert("Numeric fields (Ability Range, Cooldown, and Charges) cannot be less than 0.");
            return; // Stop the form submission if validation fails
        }

        // Create a data object to send
        let data = {
            ability_name: abilityNameValue,
            special_effect: specialEffectValue,
            ability_range: abilityRangeValue,
            cooldown: cooldownValue,
            charges: chargesValue,
            track_character: trackCharacterValue
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/abilities/add-ability", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Reload the page or update data dynamically
                location.reload();
            } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        };

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));
    });
});
