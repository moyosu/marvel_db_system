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
        xhttp.open("POST", "/add-ability", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Parse the response
                let response = JSON.parse(xhttp.responseText);

                // Clear the input fields
                abilityNameInput.value = '';
                specialEffectInput.value = '';
                abilityRangeInput.value = '';
                cooldownInput.value = '';
                chargesInput.value = '';

                // Reload the page or update data dynamically
                location.reload();

                // hide the form
                showForm('browse');
            } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        };

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));
    });
});
