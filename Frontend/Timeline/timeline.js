// Simple array of timeline events; extend as needed!
const events = [
  { date: "Sep 2017", description: "Started undergraduate studies at UTD." },
  { date: "Jan 2019", description: "Participated in first internship at a major tech firm." },
  { date: "May 2020", description: "Led a student group project on entrepreneurship." },
  { date: "Aug 2021", description: "Graduated and accepted first full-time role." },
  { date: "Oct 2023", description: "Returned as alumni mentor for new students." },
];

const timeline = document.getElementById('timeline');
events.forEach(ev => {
  const eventNode = document.createElement('div');
  eventNode.className = 'event';
  eventNode.innerHTML = `
    <div class="event-content">
      <div class="event-date">${ev.date}</div>
      <div class="event-desc">${ev.description}</div>
    </div>
  `;
  timeline.appendChild(eventNode);
});
