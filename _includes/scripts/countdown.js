document.addEventListener("DOMContentLoaded", function() {

  let updateTimeFunctions = [];

  document.querySelectorAll('.countdown').forEach(function(el) {

    let html = "";
    html += `<div class="part days"><div class="num">0</div><div class="unit">Days</div></div>`;
    html += `<div class="part hours"><div class="num">0</div><div class="unit">Hours</div></div>`;
    html += `<div class="part minutes"><div class="num">0</div><div class="unit">Minutes</div></div>`;
    html += `<div class="part seconds"><div class="num">0</div><div class="unit">Seconds</div></div>`;
    el.innerHTML = html;

    var eventStart = parseFloat(el.getAttribute('totimestamp'));
    if (isFinite(eventStart)) {
      let updateTimeFunction = makeUpdateTimeFunction(eventStart, el);
      updateTimeFunction();
      updateTimeFunctions.push(updateTimeFunction);
    }
  });

  if (updateTimeFunctions.length) {
    // only set interval once regardless of how many functions there are
    window.setInterval(function() {
      updateTimeFunctions.forEach(updateTimeFunction => updateTimeFunction());
    }, 1000);
  }

  function makeUpdateTimeFunction(eventStart, el) {
    let daysEl = el.querySelector('.days .num');
    let hoursEl = el.querySelector('.hours .num');
    let minutesEl = el.querySelector('.minutes .num');
    let secondsEl = el.querySelector('.seconds .num');
    return function() {
      var delta = Math.floor((eventStart - Date.now()) / 1000);
      if (delta < 0) delta = 0;

      let d = Math.floor(delta / 86400);
      delta -= d * 86400;
      let h = Math.floor(delta / 3600) % 24;
      delta -= h * 3600;
      let m = Math.floor(delta / 60) % 60;
      delta -= m * 60;
      let s = delta % 60;

      if (daysEl.textContent !== d.toString()) daysEl.textContent = d;
      if (hoursEl.textContent !== h.toString()) hoursEl.textContent = h;
      if (minutesEl.textContent !== m.toString()) minutesEl.textContent = m;
      secondsEl.textContent = s;
    }
  }
});

