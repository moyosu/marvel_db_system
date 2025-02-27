

document.addEventListener("DOMContentLoaded", function () {
    function showForm(formType, id = null) {
        const forms = ["browse", "insert", "update", "delete"];
        
        // Hide all forms
        forms.forEach(form => {
            document.getElementById(form).classList.add("hidden");
        });

        // Show the selected form
        document.getElementById(formType).classList.remove("hidden");

        // Populate edit form if needed
        // if (formType === "update" && id) {
        //     let playerRows = document.querySelectorAll("table tr");

        //     playerRows.forEach(row => {
        //         let cells = row.children;
        //         if (cells.length > 2 && cells[2].innerText.trim() == id) { 
        //             document.getElementById("edit-player-id-input").value = cells[2].innerText.trim();
        //             document.getElementById("edit-player-name-input").value = cells[3].innerText.trim();
        //             document.getElementById("edit-player-rank-input").value = cells[4].innerText.trim();
        //         }
        //     });
        // }

        // Show delete message
        if (formType === "delete" && id) {
            document.getElementById("delete-message").innerText = `${id}`;
        }
    }

    // Function to add a player (placeholder)
    window.addPlayer = function () {
        alert("Player added! (Functionality not implemented yet)");
        showForm('browse');
    };

    // Function to save changes to a player (placeholder)
    window.saveChanges = function () {
        alert("Changes saved! (Functionality not implemented yet)");
        showForm('browse');
    };

    // Function to delete a player (placeholder)
    window.confirmDelete = function () {
        alert("Player deleted! (Functionality not implemented yet)");
        showForm('browse');
    };

    // Make function globally available
    window.showForm = showForm;
});

function filterPlayers() {
    const selectedRank = document.getElementById("dropdown-filter").value;
    const table = document.querySelector(".table-container table");
    const rows = table.getElementsByTagName("tr");

    // Loop through table rows, starting from index 1 to skip the header row
    for (let i = 1; i < rows.length; i++) {
        const rankCell = rows[i].getElementsByTagName("td")[4]; // Rank column (zero-based index)
        if (rankCell) {
            const rankText = rankCell.textContent || rankCell.innerText;
            if (selectedRank === "all" || rankText === selectedRank) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}

function filterCharacters() {
    const selectedRole = document.getElementById("dropdown-filter").value; // Corrected variable name
    const table = document.querySelector(".table-container table"); // Added dot to select by class
    const rows = table.getElementsByTagName("tr");

    // Loop through table rows, starting from index 1 to skip the header row
    for (let i = 1; i < rows.length; i++) {
        const roleCell = rows[i].getElementsByTagName("td")[4]; // Role column (zero-based index)
        if (roleCell) {
            const roleText = roleCell.textContent || roleCell.innerText;
            if (selectedRole === "all" || roleText === selectedRole) { // Corrected variable name
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}

function filterBattles() {
    const selectedRole = document.getElementById("dropdown-filter").value; // Corrected variable name
    const table = document.querySelector(".table-container table"); // Added dot to select by class
    const rows = table.getElementsByTagName("tr");

    // Loop through table rows, starting from index 1 to skip the header row
    for (let i = 1; i < rows.length; i++) {
        const roleCell = rows[i].getElementsByTagName("td")[4]; // Role column (zero-based index)
        if (roleCell) {
            const roleText = roleCell.textContent || roleCell.innerText;
            if (selectedRole === "all" || roleText === selectedRole) { // Corrected variable name
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}

function filterTable() {
    let input = document.getElementById("searchInput").value.toLowerCase().trim(); // Ensure consistent input
    let table = document.getElementById("IT-table");
    let rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        let inputCell = rows[i].getElementsByTagName("td")[2]; // track_player column
        if (inputCell) {
            let id = inputCell.textContent || inputCell.innerText;
            id = id.trim().toLowerCase(); // Normalize the table value

            // Convert both values to strings before comparison
            rows[i].style.display = id.includes(input) ? "" : "none";
        }
    }
}

