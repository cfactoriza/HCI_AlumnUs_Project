const imageMap = {
  graduation: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=cover&w=600&q=80",
  job: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=cover&w=600&q=80",
  award: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=cover&w=600&q=80",
  travel: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=cover&w=600&q=80",
  general: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=cover&w=600&q=80"
};

const initialEvents = [
  { date: "May 2017", description: "Won spelling bee in middle school.", type: "award" },
  { date: "June 2017", description: "Volunteered for animal shelter.", type: "general" },
  { date: "August 2017", description: "Graduated highschool with honors.", type: "graduation" },
  { date: "September 2017", description: "Started undergraduate studies at UTD.", type: "general" },
  { date: "January 2018", description: "Forgot to register for Math 1301. Had to add late.", type: "general" },
  { date: "April 2018", description: "Joined campus chess club.", type: "general" },
  { date: "March 2018", description: "Received Dean's List certificate.", type: "award" },
  { date: "July 2018", description: "Attended a comic book convention.", type: "travel" },
  { date: "January 2019", description: "Participated in first internship at tech firm.", type: "job" },
  { date: "May 2019", description: "Failed Chemistry 101. Had to retake next semester.", type: "general" },
  { date: "August 2019", description: "Started research position in computer vision lab.", type: "job" },
  { date: "November 2019", description: "Took up baking as a hobby.", type: "general" },
  { date: "February 2020", description: "Mistakenly signed up for graduate course. Dropped after week 2.", type: "general" },
  { date: "May 2020", description: "Led group project on entrepreneurship.", type: "job" },
  { date: "August 2020", description: "Studied abroad in Japan for 1 semester.", type: "travel" },
  { date: "December 2020", description: "Attended a friends wedding.", type: "travel" },
  { date: "June 2021", description: "Graduated from UTD with BSc in CS.", type: "graduation" },
  { date: "July 2021", description: "Moved to Austin for job hunt.", type: "job" },
  { date: "August 2021", description: "Started full-time role at TechX Solutions.", type: "job" },
  { date: "November 2021", description: "Became team lead on cloud project.", type: "job" },
  { date: "March 2022", description: "Ran a marathon in Dallas.", type: "award" },
  { date: "October 2023", description: "Returned as alumni mentor for UTD students.", type: "general" }
];

const defaultPeerNotes = [
  [
    { text: "Interesting early achievement, not strictly relevant to college timeline.", by: "Reviewer - Sam" }
  ],
  [
    { text: "Community service is a good addition!", by: "Reviewer - Kelly" }
  ],
  [
    { text: "Key milestone. Well done.", by: "Mentor" }
  ],
  [],
  [
    { text: "Consider discussing time management improvements.", by: "Mentor" },
    { text: "I had a similar experience first year!", by: "Reviewer - Chris" }
  ],
  [],
  [
    { text: "Strong academic performance!", by: "Mentor" }
  ],
  [
    { text: "Fun event, but not academic.", by: "Reviewer - Jessie" }
  ]
];

while (defaultPeerNotes.length < initialEvents.length) defaultPeerNotes.push([]);

function cloneInitialEvents() {
  return initialEvents.map(ev => ({
    ...ev, isGoal: ev.isGoal || false, completed: false
  }));
}

function createState() {
  return {
    events: cloneInitialEvents(),
    peerNotes: JSON.parse(JSON.stringify(defaultPeerNotes)),
    changeHistory: []
  };
}

let state = createState();

function logChange(action) {
  const timestamp = new Date().toLocaleString();
  state.changeHistory.unshift(`[${timestamp}] ${action}`);
  if (state.changeHistory.length > 10) state.changeHistory = state.changeHistory.slice(0, 10);
  renderHistory();
}

function renderHistory() {
  const historyDiv = document.getElementById("history-log");
  if (historyDiv) {
    historyDiv.innerHTML =
      "<h3>Change History (last 10)</h3><ul>" +
      state.changeHistory.map(h => `<li>${h}</li>`).join("") +
      "</ul>";
  }
}

/**
 * Display a toast notification for level-up events.
 * @param {number} newLevel - new level after leveling up
 */

function showLevelUpToast(newLevel) {
   let currentTier = Math.floor(newLevel / 5) + 1;
   let currentLvl = newLevel % 5 + 1;

  const message = `🎉 Level Up! You're now level ${currentLvl} Tier ${currentTier}!`;
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
        background: linear-gradient(135deg, #f59e42 0%, #d6852dff 100%);
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

function getEventTags(ev, idx, arr) {
  const tags = [];
  if (ev.type === "graduation" && idx !== 0) {
    const prevTypes = arr.slice(0, idx).map(e => e.type);
    if (!prevTypes.includes("general") && !prevTypes.includes("job")) {
      tags.push("Check graduation placement");
    }
  }
  if (ev.type === "job") tags.push("Career Milestone");
  if (ev.type === "graduation") tags.push("Graduation Event");
  if (ev.description.length < 18) tags.push("Description is short");
  if (/fail|forgot|mistakenly|error/i.test(ev.description)) tags.push("Possible Error");
  if (ev.type === "travel") tags.push("Travel/Conference");
  return tags;
}

function renderTimeline() {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';
  state.events.forEach((ev, idx) => {
    const isGoal = !!ev.isGoal;
    const eventTags = getEventTags(ev, idx, state.events);
    const tagsSection = eventTags.length
      ? `<div class="event-tags">${eventTags.map(t => `<span class="tag">${t}</span>`).join(' ')}</div>`
      : "";
    const imgUrl = imageMap[ev.type] || imageMap.general;
    const highlight = state.peerNotes[idx].length >= 2 ? "highlight-event" : "";
    const goalClass = isGoal ? "goal-card" : "";
    const goalSection = isGoal
      ? `<div class="goal-badge">${ev.completed ? "✔ Goal Complete" : "🎯 Milestone/Goal"}</div>
         ${!ev.completed ? `<button onclick="markGoalComplete(${idx})" class="goal-btn">Mark Complete</button>` : ""}`
      : "";
    const peerNoteBtn = `<button onclick="addPeerNote(${idx})" class="peer-btn">Leave Reviewer Note</button>`;
    const notesSection = state.peerNotes[idx].length
      ? `<div class="peer-notes">${
          state.peerNotes[idx].map((note, i) =>
            note.by === "Mentor"
            ? `<div class="mentor-note sticky-pin"><span class="pin-emoji">📌</span><strong>Mentor:</strong> ${note.text}</div>`
            : `<div class="reviewer-note sticky-star"><span class="star-emoji">⭐</span><strong>${note.by || "Reviewer"}:</strong> ${note.text}</div>`
          ).join('')
        }</div>`
      : "";
    const pinSection = `<button onclick="pinNotePrompt(${idx})" class="pin-btn">Pin Note</button>`;
    const eventNode = document.createElement('div');
    eventNode.className = `event${highlight ? ` ${highlight}` : ''} ${goalClass}`;
    eventNode.innerHTML = `
      <div class="event-content">
        <img src="${imgUrl}" class="event-image-bg" alt="" aria-hidden="true">
        ${goalSection}
        <div class="event-date">${ev.date}</div>
        ${tagsSection}
        <div class="event-des" id="event-des-${idx}">${ev.description}</div>
        <button onclick="editEvent(${idx})" class="edit-btn">Edit</button>
        <button onclick="deleteEvent(${idx})" class="delete-btn">Delete</button>
        ${idx > 0 ? `<button onclick="moveEventUp(${idx})" class="move-btn">Move Up</button>` : ''}
        ${idx < state.events.length - 1 ? `<button onclick="moveEventDown(${idx})" class="move-btn">Move Down</button>` : ''}
        ${pinSection}
        ${peerNoteBtn}
        ${notesSection}
      </div>
    `;
    timeline.appendChild(eventNode);
  });
  renderHistory();
}

window.editEvent = function(idx) {
  const descElem = document.getElementById(`event-des-${idx}`);
  descElem.innerHTML = `<input type="text" id="desc-input-${idx}" value="${state.events[idx].description}" /><button onclick="saveEvent(${idx})" class="save-btn">Save</button>`;
};
window.saveEvent = function(idx) {
  const inputElem = document.getElementById(`desc-input-${idx}`);
  const newDesc = inputElem.value;
  if (newDesc && newDesc.trim().length >= 3) {
    state.events[idx].description = newDesc.trim();
    logChange("Edited event at index " + idx);
    renderTimeline();
  } else {
    alert("Please enter a valid description.");
  }
};
window.deleteEvent = function(idx) {
  logChange("Deleted event: " + state.events[idx]?.description);
  state.events.splice(idx, 1);
  state.peerNotes.splice(idx, 1);
  renderTimeline();
};
window.moveEventUp = function(idx) {
  if (idx <= 0) return;
  [state.events[idx - 1], state.events[idx]] = [state.events[idx], state.events[idx - 1]];
  [state.peerNotes[idx - 1], state.peerNotes[idx]] = [state.peerNotes[idx], state.peerNotes[idx - 1]];
  logChange("Moved event up: " + state.events[idx - 1].description);
  renderTimeline();
};
window.moveEventDown = function(idx) {
  if (idx >= state.events.length - 1) return;
  [state.events[idx + 1], state.events[idx]] = [state.events[idx], state.events[idx + 1]];
  [state.peerNotes[idx + 1], state.peerNotes[idx]] = [state.peerNotes[idx], state.peerNotes[idx + 1]];
  logChange("Moved event down: " + state.events[idx + 1].description);
  renderTimeline();
};
window.pinNotePrompt = function(idx) {
  const newNote = prompt("Enter mentor note for this event:");
  if (newNote && newNote.trim().length >= 3) {
    state.peerNotes[idx].push({ text: newNote.trim(), by: "Mentor" });
    logChange("Pinned mentor note at event index " + idx);
    renderTimeline();
  } else {
    alert("Please enter a valid note.");
  }


  
  //THIS LEVELS UP
  let level = parseInt(sessionStorage.getItem('userLevel')) || 0;
    level++;
    sessionStorage.setItem('userLevel', level);
    showLevelUpToast(level);

};
window.addPeerNote = function(idx) {
  const name = prompt("Your name or reviewer tag (optional):", "");
  const text = prompt("Enter your comment for this event:");
  if (text && text.trim().length >= 3) {
    state.peerNotes[idx].push({ text: text.trim(), by: name && name.trim() });
    logChange("Added peer/reviewer note at event " + idx);
    renderTimeline();
  } else {
    alert("Please enter a valid comment.");
  }
  //level up for commenting
  let level = parseInt(sessionStorage.getItem('userLevel')) || 0;
    level++;
    sessionStorage.setItem('userLevel', level);
    showLevelUpToast(level);

};
window.markGoalComplete = function(idx) {
  if (state.events[idx].isGoal) {
    state.events[idx].completed = true;
    logChange("Marked goal as complete at index " + idx);
    renderTimeline();

    let level = parseInt(sessionStorage.getItem('userLevel')) || 0;
    level++;
    sessionStorage.setItem('userLevel', level);
  }
};
function addEventHandler(e) {
  e.preventDefault();
  const dateInput = document.getElementById('event-date-input').value.trim();
  const descInput = document.getElementById('event-desc-input').value.trim();
  const typeInput = document.getElementById('event-type-input').value;
  const isGoal = document.getElementById('is-goal-input').checked;
  if (dateInput && dateInput.length >= 3 && descInput && descInput.length >= 3) {
    state.events.push({ date: dateInput, description: descInput, type: typeInput, isGoal, completed: false });
    state.peerNotes.push([]);
    logChange("Added event: " + descInput);
    renderTimeline();
    document.getElementById('add-event-form').reset();
    // Level up when a user adds an event
    let level = parseInt(sessionStorage.getItem('userLevel')) || 0;
    level++;
    sessionStorage.setItem('userLevel', level);
    // Show toast using the timeline's level-up function (if available)
    try { if (typeof showLevelUpToast === 'function') showLevelUpToast(level); } catch (e) { /* ignore */ }
  } else {
    alert("Please provide a valid date and description.");
  }



}
function resetTimeline() {
  state = createState();
  logChange("Timeline reset.");
  renderTimeline();
}
renderTimeline();
