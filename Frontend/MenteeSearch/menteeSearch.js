// Mentee Search Logic

document.addEventListener('DOMContentLoaded', () => {
    // Initial calls
    populateFilters();
    // The list will only display after the user hits the search button
});

// In-memory set to keep track of requested mentees for the current page lifetime
const REQUESTED_MENTEES = new Set();

/**
 * Display a toast notification for level-up events.
 * @param {number} newLevel - The new level after leveling up.
 */
function showLevelUpToast(newLevel) {
  const message = `🎉 Level Up! You're now level ${newLevel}!`;
  console.log(message);

  const levelUpToast = document.createElement('div');
  levelUpToast.className = 'level-up-toast';
  levelUpToast.textContent = message;
  document.body.appendChild(levelUpToast);

  // Add keyframes and styles once
  if (!document.querySelector('style[data-level-up-css]')) {
    const styleSheet = document.createElement('style');
    styleSheet.setAttribute('data-level-up-css', 'true');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
      @keyframes levelup-fadein { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes levelup-fadeout { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-20px); } }
      .level-up-toast { 
        position: fixed; 
        top: 20px; 
        left: 50%; 
        transform: translateX(-50%); 
        padding: 16px 24px; 
        background: linear-gradient(135deg, #f59e42 0%, #e88d2dff 100%); 
        color: #fff; 
        border-radius: 8px; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.3); 
        z-index: 1000; 
        font-weight: 600; 
        font-size: 16px;
        animation: levelup-fadein 0.4s, levelup-fadeout 0.4s 4.6s; 
      }
    `;
    document.head.appendChild(styleSheet);
  }

  setTimeout(() => levelUpToast.remove(), 5000);
}

/**
 * Populates the filter dropdowns using the unique data gathered in mentee_data.js.
 */
function populateFilters() {
    const departmentSelect = document.getElementById('filter-department');
    const majorSelect = document.getElementById('filter-major');
    const classSelect = document.getElementById('filter-class');
    const professorSelect = document.getElementById('filter-professor');
    const universitySelect = document.getElementById('filter-university');
    if (!departmentSelect || !majorSelect || !classSelect || !professorSelect || !universitySelect) {
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
    addOptions(majorSelect, ALL_FILTERS.majors);
    addOptions(classSelect, ALL_FILTERS.classes);
    addOptions(professorSelect, ALL_FILTERS.professors);
    addOptions(universitySelect, ALL_FILTERS.universities);
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

        // Create base card HTML
        card.innerHTML = `
            <img src="${mentee.image}" alt="${mentee.name}'s Avatar" class="mentee-avatar">
            <div class="mentee-info">
                <div class="mentee-name">${mentee.name}</div>
                <div class="mentee-major">${mentee.major} at ${mentee.university}</div>
                <div class="mentee-details">${detailsHtml}</div>
            </div>
        `;

        // Create request button and wire up behavior
        const button = document.createElement('button');
        button.className = 'request-button';
        button.dataset.menteeId = mentee.id;
        button.type = 'button';

        // Default button label
        button.textContent = 'Request Connect';

        // If this mentee has already been requested during this page session, show requested state
        if (REQUESTED_MENTEES.has(mentee.id)) {
            button.textContent = 'Requested ✓';
            button.disabled = true;
            button.classList.add('requested');
        }

        button.addEventListener('click', () => alertRequest(mentee.name, button, mentee.id));

        card.appendChild(button);
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
    const majorSelect = document.getElementById('filter-major');
    const classSelect = document.getElementById('filter-class');
    const profSelect = document.getElementById('filter-professor');
    const universitySelect = document.getElementById('filter-university');
    
    if (!searchInput || !deptSelect || !majorSelect || !classSelect || !profSelect || !universitySelect) {
        console.error("Filtering Error: One or more input elements are missing in the HTML.");
        return;
    }

    const query = searchInput.value.toLowerCase();
    const deptFilter = deptSelect.value;
    const majorFilter = majorSelect.value;
    const classFilter = classSelect.value;
    const profFilter = profSelect.value;
    const uniFilter = universitySelect.value;
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

        // 3. Major Filter
        if (majorFilter && mentee.major !== majorFilter) return false;

        // 4. Class Filter
        if (classFilter && !mentee.classes.includes(classFilter)) return false;

        // 4. Professor Filter
        if (profFilter && !mentee.professors.includes(profFilter)) return false;

        // 5. University Filter
        if (uniFilter && mentee.university !== uniFilter) return false;

        return true;
    });

    renderMentees(filteredMentees);
}

/**
 * Custom alert function to display connection request success.
 * @param {string} menteeName - The name of the mentee being requested.
 */
function alertRequest(menteeName, buttonEl, menteeId) {

    // add level up
    let level = parseInt(sessionStorage.getItem('userLevel')) || 0;
    level++;
    sessionStorage.setItem('userLevel', level);
    showLevelUpToast(level);

    // Show a small, non-blocking toast
    const message = `Connection request sent to ${menteeName}! They will review your profile.`;
    console.log(message);

    const successToast = document.createElement('div');
    successToast.className = 'ms-toast';
    successToast.textContent = message;
    document.body.appendChild(successToast);

    // Add keyframes once
    if (!document.querySelector('style[data-ms-toast-css]')) {
        const styleSheet = document.createElement('style');
        styleSheet.setAttribute('data-ms-toast-css', 'true');
        styleSheet.type = 'text/css';
        styleSheet.innerText = `
            @keyframes ms-fadein { from { opacity: 0; } to { opacity: 1; } }
            @keyframes ms-fadeout { from { opacity: 1; } to { opacity: 0; } }
            .ms-toast { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); padding: 12px 20px; background: #111827; color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); z-index: 1000; font-weight: 600; animation: ms-fadein 0.3s, ms-fadeout 0.3s 2.2s; }
        `;
        document.head.appendChild(styleSheet);
    }

    setTimeout(() => successToast.remove(), 2500);

    // Update button state to requested (in-memory)
    if (buttonEl) {
        buttonEl.textContent = 'Requested ✓';
        buttonEl.disabled = true;
        buttonEl.classList.add('requested');
    }

    if (typeof menteeId !== 'undefined') {
        REQUESTED_MENTEES.add(menteeId);
    }
}
