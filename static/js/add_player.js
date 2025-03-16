document.addEventListener("DOMContentLoaded", function () {
    // Get the form element
    let addPlayerForm = document.getElementById('add-player-form-ajax');

    // Add an event listener for the form submission
    addPlayerForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form fields we need to get data from
        let inputPlayerName = document.getElementById("player-name-input");
        let inputPlayerRank = document.getElementById("player-rank-input");

        // Get the values from the form fields
        let playerNameValue = inputPlayerName.value;
        let playerRankValue = inputPlayerRank.value;

        // Create a data object to send
        let data = {
            player_name: playerNameValue,
            rank: playerRankValue
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/players/add-player", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Parse the response
                let response = JSON.parse(xhttp.responseText);

                // Add the new row to the table
                // addRowToTable(response);

                // Clear the input fields
                inputPlayerName.value = '';
                inputPlayerRank.value = '';
                
                // Refresh the window to reflect the new player addition
                location.reload(); 
                // Hide the form
                showForm('browse');
            } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.");
            }
        };

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));
    });

    // Function to add a row to the table
    function addRowToTable(data) {
        let table = document.getElementById("players-table");

        // Create a new row
        let newRow = table.insertRow(-1);

        // Add cells to the row
        let editCell = newRow.insertCell(0);
        let deleteCell = newRow.insertCell(1);
        let idCell = newRow.insertCell(2);
        let nameCell = newRow.insertCell(3);
        let rankCell = newRow.insertCell(4);

        // Add data to the cells
        editCell.innerHTML = `<a href="#" onClick="showForm('update', ${data[data.length - 1]['Player ID']})">Edit</a>`;
        deleteCell.innerHTML = `<a href="#" onclick="showForm('delete', ${data[data.length - 1]['Player ID']})">Delete</a>`;
        idCell.innerText = data[data.length - 1]['Player ID'];
        nameCell.innerText = data[data.length - 1]['Player'];
        rankCell.innerText = data[data.length - 1]['Rank'];
    }
});