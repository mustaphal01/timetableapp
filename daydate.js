function displayDayAndDate() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const dayIndex = currentDate.getDay();
  const dateIndex = currentDate.getDate();
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const dayElement = document.getElementById("day");
  const dateElement = document.getElementById("date");

  dayElement.textContent = daysOfWeek[dayIndex];
  dateElement.textContent = `${monthsOfYear[monthIndex]} ${dateIndex}, ${year}`;
}

displayDayAndDate();
