const schedule = [
  { id: "activation", 
  label: "activation", 
  offset: -180,
  details: [
    "Turbo: 10m easy, 3x 5s OOS max sprint w/5m recovery."
  ]
  },
  { id: "rollers", 
  label: "Rollers/Turbo", 
  offset: -80,
  details: [
    "15m with 1-2x rev outs/1-3x 6s sprints. Increase muscle temperature."
  ]
  },
  { id: "priming", 
  label: "Priming Efforts 1", 
  offset: -45,
  details: [
    "Race gear: 10s @80%, 6s @95% w/ 3min between."
  ]
  },
    { id: "priming_2", 
  label: "Priming Efforts 2", 
  offset: -20,
  details: [
    "2x Uphill/resisted starts"
  ]
  },
  { id: "iso", 
  label: "Iso (Optional)", 
  offset: -8,
  details: [
    "135/90/45 deg x3 reps x3s hold per side."
  ]
  },
  { id: "race", 
  label: "Race Start", 
  offset: 0,
  details: []
  }
];

function parseTime(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return new Date(1970, 0, 1, h, m);
}

function formatTime(date) {
  return date.toTimeString().slice(0, 5);
}

function updateSchedule() {
  const raceTimeInput = document.getElementById("raceTime").value;
  const raceTime = parseTime(raceTimeInput);

  schedule.forEach(item => {
    const time = new Date(raceTime);
    time.setMinutes(time.getMinutes() + item.offset);

    document.getElementById(item.id).textContent =
      `${formatTime(time)} — ${item.label}`;
  });
}

document.getElementById("raceTime").addEventListener("input", updateSchedule);

function updateSchedule() {
  const raceTimeInput = document.getElementById("raceTime").value;
  const raceTime = parseTime(raceTimeInput);

  const container = document.getElementById("schedule");
  container.innerHTML = ""; // clear previous render

  schedule.forEach(item => {
    const time = new Date(raceTime);
    time.setMinutes(time.getMinutes() + item.offset);

    const card = document.createElement("div");
    card.className = "activity";

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = `${formatTime(time)} — ${item.label}`;

    const list = document.createElement("ul");

    item.details.forEach(d => {
      const li = document.createElement("li");
      li.textContent = d;
      list.appendChild(li);
    });

    card.appendChild(title);
    card.appendChild(list);

    container.appendChild(card);
  });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
