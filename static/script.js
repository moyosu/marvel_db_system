window.showForm = function (formType, id = null, name = null) {
    const forms = ["browse", "insert", "update", "delete"];
    
    // Hide all forms
    forms.forEach(form => {
        let element = document.getElementById(form);
        if (element) {
            element.classList.add("hidden");
        }
    });

    // Show the selected form
    let selectedForm = document.getElementById(formType);
    if (selectedForm) {
        selectedForm.classList.remove("hidden");
    } else {
        console.error("Form not found:", formType);
    }
    
    if (formType === "delete" && id && name) {
        document.getElementById("delete-character-id").innerText = `${id}`;
        document.getElementById("delete-character-name").innerText = `${name}`;
    }
}

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

