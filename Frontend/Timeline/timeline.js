const initialEvents = [
  { date: "May 2017", description: "Won spelling bee in middle school." },
  { date: "June 2017", description: "Volunteered for animal shelter." },
  { date: "August 2017", description: "Graduated highschool with honors." },
  { date: "September 2017", description: "Started undergraduate studies at UTD." },
  { date: "January 2018", description: "Forgot to register for Math 1301. Had to add late." },
  { date: "April 2018", description: "Joined campus chess club." },
  { date: "March 2018", description: "Received Dean's List certificate." },
  { date: "July 2018", description: "Attended a comic book convention." },
  { date: "January 2019", description: "Participated in first internship at tech firm." },
  { date: "May 2019", description: "Failed Chemistry 101. Had to retake next semester." },
  { date: "August 2019", description: "Started research position in computer vision lab." },
  { date: "November 2019", description: "Took up baking as a hobby." },
  { date: "February 2020", description: "Mistakenly signed up for graduate course. Dropped after week 2." },
  { date: "May 2020", description: "Led group project on entrepreneurship." },
  { date: "August 2020", description: "Studied abroad in Japan for 1 semester." },
  { date: "December 2020", description: "Attended a friends wedding." },
  { date: "June 2021", description: "Graduated from UTD with BSc in CS." },
  { date: "July 2021", description: "Moved to Austin for job hunt." },
  { date: "August 2021", description: "Started full-time role at TechX Solutions." },
  { date: "November 2021", description: "Became team lead on cloud project." },
  { date: "March 2022", description: "Ran a marathon in Dallas." },
  { date: "October 2023", description: "Returned as alumni mentor for UTD students." }
];
let events = initialEvents.map(ev => ({ ...ev }));
let notes = Array(events.length).fill("");

function renderTimeline() {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';
  events.forEach((ev, idx) => {
    const noteSection = notes[idx]
      ? `<div class="mentor-note"><strong>Mentor Note:</strong> ${notes[idx]}</div>`
      : "";
    const pinSection = `
      <button onclick="pinNotePrompt(${idx})" class="pin-btn">Pin Note</button>
    `;
    const eventNode = document.createElement('div');
    eventNode.className = 'event';
    eventNode.innerHTML = `
      <div class="event-content">
        <div class="event-date">${ev.date}</div>
        <div class="event-des" id="event-des-${idx}">${ev.description}</div>
        <button onclick="editEvent(${idx})" class="edit-btn">Edit</button>
        <button onclick="deleteEvent(${idx})" class="delete-btn">Delete</button>
        ${idx > 0 ? `<button onclick="moveEventUp(${idx})" class="move-btn">Move Up</button>` : ''}
        ${idx < events.length - 1 ? `<button onclick="moveEventDown(${idx})" class="move-btn">Move Down</button>` : ''}
        ${pinSection}
        ${noteSection}
      </div>
    `;
    timeline.appendChild(eventNode);
  });
}

window.editEvent = function(idx) {
  const descElem = document.getElementById(`event-des-${idx}`);
  const currentDesc = descElem.textContent;
  descElem.innerHTML = `<input type="text" id="desc-input-${idx}" value="${currentDesc}" /><button onclick="saveEvent(${idx})" class="save-btn">Save</button>`;
};

window.saveEvent = function(idx) {
  const inputElem = document.getElementById(`desc-input-${idx}`);
  const newDesc = inputElem.value;
  events[idx].description = newDesc;
  renderTimeline();
};

window.deleteEvent = function(idx) {
  events.splice(idx, 1);
  notes.splice(idx, 1);
  renderTimeline();
};

window.moveEventUp = function(idx) {
  if (idx <= 0) return;
  [events[idx - 1], events[idx]] = [events[idx], events[idx - 1]];
  [notes[idx - 1], notes[idx]] = [notes[idx], notes[idx - 1]];
  renderTimeline();
};

window.moveEventDown = function(idx) {
  if (idx >= events.length - 1) return;
  [events[idx + 1], events[idx]] = [events[idx], events[idx + 1]];
  [notes[idx + 1], notes[idx]] = [notes[idx], notes[idx + 1]];
  renderTimeline();
};

window.pinNotePrompt = function(idx) {
  const newNote = prompt("Enter mentor note for this event:");
  if (newNote !== null) {
    notes[idx] = newNote.trim();
    renderTimeline();
  }
};

function resetTimeline() {
  events = initialEvents.map(ev => ({ ...ev }));
  notes = Array(events.length).fill("");
  renderTimeline();
}

renderTimeline();
