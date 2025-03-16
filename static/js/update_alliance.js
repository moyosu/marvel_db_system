function updateAlliance(alliance_id, alliance_name, stat_boost, stat_boost_type) {
    // Display the alliance ID in the modal
    document.getElementById('edit-alliance-id-input').value = alliance_id;
    document.getElementById('edit-alliance-name-input').value = alliance_name;
    document.getElementById('edit-stat-boost-input').value = stat_boost;
    document.getElementById('edit-stat-boost-type-input').value = stat_boost_type;

    // Show the modal
    showForm('update', alliance_id);
}

// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", function () {
    let updateAllianceForm = document.getElementById('update-alliance-form-ajax');

    // Check if the form exists before adding the event listener
    if (updateAllianceForm) {
        updateAllianceForm.addEventListener("submit", function (e) {
            // Prevent the form from submitting
            e.preventDefault();

            // Get form fields we need to get data from
            let inputAllianceID = document.getElementById("edit-alliance-id-input");
            let inputAllianceName = document.getElementById("edit-alliance-name-input");
            let inputStatBoost = document.getElementById("edit-stat-boost-input");
            let inputStatBoostType = document.getElementById("edit-stat-boost-type-input");

            // Get the values from the form fields
            let allianceIDValue = inputAllianceID.value;
            let allianceNameValue = inputAllianceName.value;
            let statBoostValue = inputStatBoost.value;
            let statBoostTypeValue = inputStatBoostType.value;


            // Create a data object to send
            let data = {
                alliance_id: allianceIDValue, // Include alliance ID
                alliance_name: allianceNameValue,
                stat_boost: statBoostValue,
                stat_boost_type: statBoostTypeValue
            };

            console.log(data);

            // Setup our AJAX request
            var xhttp = new XMLHttpRequest();
            xhttp.open("PUT", "/alliances/put-alliance-ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");

            // Tell our AJAX request how to resolve
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    // Add the new data to the table
                    location.reload();
                } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                    alert("There was an error with the input.")
                    console.log("There was an error with the input.")
                }
            }

            // Send the request and wait for the response
            xhttp.send(JSON.stringify(data));
        });
    }
});