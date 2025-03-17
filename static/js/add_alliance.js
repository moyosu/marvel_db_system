document.addEventListener("DOMContentLoaded", function () {
    // Get the form element
    let addAllianceForm = document.getElementById('add-alliance-form-ajax');

    // Add an event listener for the form submission
    addAllianceForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form fields we need to get data from
        let inputAllianceName = document.getElementById("alliance-name-input");
        let inputStatBoost = document.getElementById("stat-boost-input");
        let inputStatBoostType = document.getElementById("stat-boost-type-input");

        // Get the values from the form fields
        let allianceNameValue = inputAllianceName.value;
        let statBoostValue = inputStatBoost.value;
        let statBoostTypeValue = inputStatBoostType.value;

        if (
            statBoostValue < 0
        ) {
            alert("Numeric field (Stat Boost) cannot be less than 0.");
            return; // Stop the form submission if validation fails
        }

        // Create a data object to send
        let data = {
            alliance_name: allianceNameValue,
            stat_boost: statBoostValue,
            stat_boost_type: statBoostTypeValue
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/alliances/add-alliance", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Reload the page
                location.reload();
            } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        };
        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));
    });
});
