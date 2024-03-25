// script.js
document.addEventListener("DOMContentLoaded", function() {
    const addEventBtn = document.getElementById("add-event-btn");
    const eventList = document.getElementById("event-list");
    const addEventModal = document.getElementById("add-event-modal");
    const closeEventModal = document.querySelector("#add-event-modal .close");
    const eventForm = document.getElementById("event-form");
  
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
  
      const addAttendeeBtn = eventItem.querySelector(".add-attendee-btn");
      addAttendeeBtn.addEventListener("click", function() {
        const attendeeName = prompt("Enter attendee's name:");
        if (attendeeName) {
          addAttendee(eventItem, attendeeName);
        }
      });
  
      const editEventBtn = eventItem.querySelector(".edit-event-btn");
      editEventBtn.addEventListener("click", function() {
        const newName = prompt("Enter new event name:", name);
        const newTime = prompt("Enter new event time:", time);
        const newLocation = prompt("Enter new event location:", location);
        if (newName && newTime && newLocation) {
          eventItem.querySelector("h3").textContent = newName;
          eventItem.querySelector("p:nth-of-type(1)").innerHTML = `<strong>Time:</strong> ${newTime}`;
          eventItem.querySelector("p:nth-of-type(2)").innerHTML = `<strong>Location:</strong> ${newLocation}`;
        }
      });
  
      const addCommentBtn = eventItem.querySelector(".add-comment-btn");
      addCommentBtn.addEventListener("click", function() {
        const comment = prompt("Enter your comment:");
        if (comment) {
          addComment(eventItem, comment);
        }
      });
    }
  
    function addAttendee(eventItem, attendeeName) {
      const attendeeList = eventItem.querySelector(".attendee-list");
      const attendeeItem = document.createElement("p");
      attendeeItem.textContent = attendeeName;
      attendeeList.appendChild(attendeeItem);
    }
  
    function addComment(eventItem, comment) {
      const commentSection = eventItem.querySelector(".comment-section");
      const commentItem = document.createElement("p");
      commentItem.textContent = comment;
      commentSection.appendChild(commentItem);
    }
  });
  
