// script.js

document.addEventListener("DOMContentLoaded", function() {
  const addEventBtn = document.getElementById("add-event-btn");
  const eventList = document.getElementById("event-list");
  const addEventModal = document.getElementById("add-event-modal");
  const closeEventModal = document.querySelector("#add-event-modal .close");
  const eventForm = document.getElementById("event-form");

  // Load events from localStorage when the page loads
  loadEvents();

  addEventBtn.addEventListener("click", function() {
    addEventModal.style.display = "block";
  });

  closeEventModal.addEventListener("click", function() {
    addEventModal.style.display = "none";
  });

  window.addEventListener("click", function(event) {
    if (event.target === addEventModal) {
      addEventModal.style.display = "none";
    }
  });

  eventForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const eventName = document.getElementById("event-name").value;
    const eventTime = document.getElementById("event-time").value;
    const eventLocation = document.getElementById("event-location").value;
    addEvent(eventName, eventTime, eventLocation);
    addEventModal.style.display = "none";
    eventForm.reset();
  });

  function addEvent(name, time, location) {
    const eventItem = document.createElement("div");
    eventItem.classList.add("event-item");
    eventItem.innerHTML = `
      <h3>${name}</h3>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Location:</strong> ${location}</p>
      <button class="edit-event-btn">Edit</button>
      <button class="add-attendee-btn">Add Attendee</button>
      <button class="add-comment-btn">Comments</button>
      <div class="attendee-list"></div>
      <div class="comment-section"></div>
    `;
    eventList.appendChild(eventItem);

    // Save events to localStorage after adding a new event
    saveEvents();
  }

  function saveEvents() {
    // Collect all event items
    const eventItems = document.querySelectorAll('.event-item');
    const events = [];

    // Iterate over event items to extract data
    eventItems.forEach(eventItem => {
      const name = eventItem.querySelector('h3').textContent;
      const time = eventItem.querySelector('p:nth-of-type(1)').textContent.split(': ')[1];
      const location = eventItem.querySelector('p:nth-of-type(2)').textContent.split(': ')[1];
      events.push({ name, time, location });
    });

    // Save events data to localStorage
    localStorage.setItem('events', JSON.stringify(events));
  }

  function loadEvents() {
    // Retrieve events data from localStorage
    const storedEvents = JSON.parse(localStorage.getItem('events'));

    // If there are stored events, add them to the page
    if (storedEvents) {
      storedEvents.forEach(event => {
        addEvent(event.name, event.time, event.location);
      });
    }
  }

  // Function to handle editing an event (similar to before)
  // Function to handle adding attendee (similar to before)
  // Function to handle adding comment (similar to before)
});
