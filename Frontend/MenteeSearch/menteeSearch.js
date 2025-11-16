// Mentee Search Logic

document.addEventListener('DOMContentLoaded', () => {
    // Initial calls
    populateFilters();
    // The list will only display after the user hits the search button
});

/**
 * Populates the filter dropdowns using the unique data gathered in mentee_data.js.
 */
function populateFilters() {
    const departmentSelect = document.getElementById('filter-department');
    const classSelect = document.getElementById('filter-class');
    const professorSelect = document.getElementById('filter-professor');

    if (!departmentSelect || !classSelect || !professorSelect) {
        console.error("Critical Error in populateFilters: One or more filter dropdown elements are missing.");
        return; 
    }

    // Helper function to add options to a select element
    const addOptions = (selectElement, values) => {
        // Sort values alphabetically
        const sortedValues = Array.from(values).sort();
        
        sortedValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            selectElement.appendChild(option);
        });
    };

    if (typeof ALL_FILTERS === 'undefined') {
        console.error("Critical Error: ALL_FILTERS object not found. Ensure menteeData.js loads correctly.");
        return;
    }

    addOptions(departmentSelect, ALL_FILTERS.departments);
    addOptions(classSelect, ALL_FILTERS.classes);
    addOptions(professorSelect, ALL_FILTERS.professors);
}

/**
 * Renders the filtered list of mentees into the UI.
 * @param {Array<Object>} menteesToRender - The array of mentee objects to display.
 */
function renderMentees(menteesToRender) {
    // Get all necessary elements for rendering
    const listContainer = document.getElementById('mentee-list');
    const noResults = document.getElementById('no-results');
    const resultsArea = document.getElementById('mentee-results-area');

    if (!listContainer || !noResults || !resultsArea) {
        console.error("Critical Error in renderMentees: Container elements are missing.");
        return; 
    }

    listContainer.innerHTML = ''; // Clear ONLY the existing cards

    // 1. Ensure the main results area is visible after a search is performed
    resultsArea.style.display = 'block';

    if (menteesToRender.length === 0) {
        // 2. Handle no results
        noResults.style.display = 'block'; // Show 'No results' message
        listContainer.style.display = 'none'; // Hide the empty card container
        return;
    }

    // 3. Handle successful results
    noResults.style.display = 'none'; // Hide 'No results' message
    listContainer.style.display = 'block'; // Show the card container

    menteesToRender.forEach(mentee => {
        const card = document.createElement('div');
        card.className = 'mentee-card';
        
        // Combine details into a clean, tagged string
        const detailsHtml = [
            mentee.department, 
            ...mentee.classes, 
            ...mentee.professors.map(p => `Prof. ${p.split(' ')[1] || p}`), 
            mentee.university.split(' ')[0] 
        ].map(detail => `<span>${detail}</span>`).join('');

        card.innerHTML = `
            <img src="${mentee.image}" alt="${mentee.name}'s Avatar" class="mentee-avatar">
            <div class="mentee-info">
                <div class="mentee-name">${mentee.name}</div>
                <div class="mentee-major">${mentee.major} at ${mentee.university}</div>
                <div class="mentee-details">${detailsHtml}</div>
            </div>
            <button class="request-button" onclick="alertRequest('${mentee.name}')">Request Connect</button>
        `;
        listContainer.appendChild(card);
    });
}

/**
 * Handles the filtering and searching logic.
 * This function is now called only by the 'Search Mentees' button click.
 */
function filterMentees() {
    if (typeof MENTEE_DATA === 'undefined') {
        console.error("Filtering failed: MENTEE_DATA is not available.");
        return;
    }

    // --- Retrieve all filter values when the button is pressed ---
    const searchInput = document.getElementById('mentee-search-input');
    const deptSelect = document.getElementById('filter-department');
    const classSelect = document.getElementById('filter-class');
    const profSelect = document.getElementById('filter-professor');
    
    if (!searchInput || !deptSelect || !classSelect || !profSelect) {
        console.error("Filtering Error: One or more input elements are missing in the HTML.");
        return;
    }

    const query = searchInput.value.toLowerCase();
    const deptFilter = deptSelect.value;
    const classFilter = classSelect.value;
    const profFilter = profSelect.value;
    // ----------------------------------------------

    const filteredMentees = MENTEE_DATA.filter(mentee => {
        // 1. Text Search Filter (Name, University, Major)
        const matchesSearch = 
            mentee.name.toLowerCase().includes(query) ||
            mentee.university.toLowerCase().includes(query) ||
            mentee.major.toLowerCase().includes(query);

        if (!matchesSearch) return false;

        // 2. Department Filter
        if (deptFilter && mentee.department !== deptFilter) return false;

        // 3. Class Filter
        if (classFilter && !mentee.classes.includes(classFilter)) return false;

        // 4. Professor Filter
        if (profFilter && !mentee.professors.includes(profFilter)) return false;

        return true;
    });

    renderMentees(filteredMentees);
}

/**
 * Custom alert function to display connection request success.
 * @param {string} menteeName - The name of the mentee being requested.
 */
function alertRequest(menteeName) {
    //add level up
    let level = parseInt(sessionStorage.getItem('userLevel')) || 0;
    level++;
    sessionStorage.setItem('userLevel', level);


    // Since alert() is forbidden, we use a non-disruptive toast message.
    
    const message = `Connection request sent to ${menteeName}! They will review your profile.`;
    console.log(message);
    
    const successToast = document.createElement('div');
    successToast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 20px;
        background: #10b981;
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        font-weight: 600;
        animation: fadein 0.5s, fadeout 0.5s 2.5s;
    `;
    successToast.textContent = message;
    document.body.appendChild(successToast);

    // Add a simple fade animation via keyframes (CSS in JS, for single file simplicity)
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeout { from { opacity: 1; } to { opacity: 0; } }
    `;
    // Prevent adding the style sheet multiple times if it was already added in the previous response
    if (!document.querySelector('style[data-toast-css]')) {
        styleSheet.setAttribute('data-toast-css', 'true');
        document.head.appendChild(styleSheet);
    }
    
    setTimeout(() => {
        successToast.remove();
    }, 3000); // Remove the message after 3 seconds
}
