// script.js - Functions for the filters on various pages

/**
 * The functionality in this file is completely our own work.
 */

/**
 * Shows the selected form and hides the others.
 * 
 * @param {string} formType - The form to display (e.g., "browse", "insert", "update", "delete").
 * @param {string|null} id - Optional ID parameter for the form.
 * @param {string|null} name - Optional name parameter for the form.
 * 
 * After choosing to follow the starter app layout, we stoped passing the id and name
 */
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
}

/**
 * Filters players based on the selected rank from the dropdown.
 * Displays only rows where the rank matches the selected rank.
 */
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

/**
 * Filters characters based on the selected role from the dropdown.
 * Displays only rows where the role matches the selected role.
 */
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

/**
 * Filters battles based on the selected role from the dropdown.
 * Displays only rows where the role matches the selected role.
 */
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

/**
 * Filters the table based on a search query entered by the user.
 * Displays only rows where the text in the track_player column matches the search query.
 */
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

/**
 * Filters abilities based on the selected character from the dropdown.
 * Displays only rows where the character matches the selected character.
 */
function filterAbilities() {
    let selectedCharacter = document.getElementById("dropdown-filter").value.toLowerCase();
    let rows = document.querySelectorAll("#browse tbody tr");

    rows.forEach(row => {
        let characterCell = row.cells[row.cells.length - 1].textContent.toLowerCase(); // Last column contains character name

        if (selectedCharacter === "all" || characterCell === selectedCharacter) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}
