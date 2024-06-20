document.addEventListener("DOMContentLoaded", () => {
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const today = new Date().getDay();
  const todayDayName = daysOfWeek[today];

  if (todayDayName !== "sunday" && todayDayName !== "saturday") {
    showDay(todayDayName);
  } else {
    // Show Monday if today is a weekend
    showDay("monday");
  }
  const dayNameElement = document.getElementById("day-name");
  const dateElement = document.getElementById("date");

  const now = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = now.toLocaleDateString(undefined, options);

  const [dayName, date] = formattedDate.split(",");
  dayNameElement.textContent = dayName + ",";
  dateElement.textContent = date.trim();

  // Toggle button functionality
  const seeRestBtn = document.getElementById("see-rest-btn");
  const timetable = document.getElementById("timetable");

  seeRestBtn.addEventListener("click", () => {
    // Toggle the display of the timetable
    if (timetable.style.display === "none" || timetable.style.display === "") {
      timetable.style.display = "block";
      seeRestBtn.textContent = "Hide Rest Of The Week"; // Change button text
    } else {
      timetable.style.display = "none";
      seeRestBtn.textContent = "Show Rest Of The Week"; // Change button text
    }
  });

  // Register the service worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js").then(
        (registration) => {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        (err) => {
          console.log("ServiceWorker registration failed: ", err);
        }
      );
    });
  }
});

function showDay(day) {
  const days = document.querySelectorAll(".day");
  const buttons = document.querySelectorAll(".day-selector button");

  days.forEach((d) => (d.style.display = "none"));
  buttons.forEach((b) => b.classList.remove("active"));

  document.getElementById(day).style.display = "block";
  document
    .querySelector(`.day-selector button[data-day="${day}"]`)
    .classList.add("active");
}

function toggleForm() {
  const popup = document.getElementById("popupForm");
  popup.classList.toggle("active");
}

function deleteClass(buttonElement) {
  const classItem = buttonElement.closest(".class-item");
  if (classItem) {
    classItem.remove();
  }
}

function addClass() {
  const day = document.getElementById("day").value;
  const className = document.getElementById("className").value;
  const venue = document.getElementById("venue").value;
  const lecturer = document.getElementById("lecturer").value;
  const time = document.getElementById("time").value;

  const classItem = document.createElement("div");
  classItem.className = "class-item";

  const classDetails = document.createElement("div");
  classDetails.className = "class-details";
  classDetails.innerHTML = `
      <strong>Class Name:</strong> ${className}<br>
      <strong>Venue:</strong> ${venue}<br>
      <strong>Lecturer:</strong> ${lecturer}<br>
      <strong>Time:</strong> ${time}
  `;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    deleteClass(this);
  };

  classItem.appendChild(classDetails);
  classItem.appendChild(deleteButton);

  document.getElementById(day).appendChild(classItem);

  // Reset form and close popup
  document.getElementById("popupForm").classList.remove("active");
  document.getElementById("day").value = "monday";
  document.getElementById("className").value = "";
  document.getElementById("venue").value = "";
  document.getElementById("lecturer").value = "";
  document.getElementById("time").value = "";
}
