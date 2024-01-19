document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.time').forEach(function(el) {
    var targetTimeZone = el.getAttribute('totimezone') || undefined;
    var sourceTime = el.getAttribute('time') && parseInt(el.getAttribute('time') + '000');
    var date = (sourceTime && new Date(sourceTime)) || parseTime(el.textContent);
    var timeZoneLabel = date.toLocaleDateString(undefined, {
      day: '2-digit',
      timeZoneName: 'long',
      timeZone: targetTimeZone,
    }).substring(4);
    var localizedTimeString = date.toLocaleString(undefined, {
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
      timeZone: targetTimeZone,
    });
    el.innerHTML = '<span title="' + timeZoneLabel + '">' + localizedTimeString + '</span>';
  });

  document.querySelectorAll('.day-long').forEach(function(el) {
    var targetTimeZone = el.getAttribute('totimezone') || undefined;
    var sourceTime = el.getAttribute('time') && parseInt(el.getAttribute('time') + '000');
    var date = (sourceTime && new Date(sourceTime)) || new Date();
    var localizedTimeString = date.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      timeZone: targetTimeZone,
    });
    el.innerHTML = localizedTimeString;
  });

  document.querySelectorAll('.timezone').forEach(function(el) {
    var targetTimeZone = el.getAttribute('totimezone') || undefined;
    var sourceTime = el.getAttribute('time') && parseInt(el.getAttribute('time') + '000');
    var date = (sourceTime && new Date(sourceTime)) || new Date();
    el.textContent = date.toLocaleDateString(undefined, {
      day:'2-digit',
      timeZoneName: 'long',
      timeZone: targetTimeZone,
    }).substring(4);
  });

  function parseTime(t) {
    var time = t.match( /(\d+)(?::(\d\d))?\s*([pP]|[aA]?)/ );
    var h = parseInt(time[1]);

    // if am or pm
    if (time[3]) {
      h = h % 12; // normalize between 0 and 11

      if (time[3].toLowerCase()[0] === 'p') {
        h += 12; // add 12 hours if pm
      }
    }
    
    // hardcode UTC offset
    h += 5;
    // normalize between 0 and 23
    h = h % 24;
    var m =  parseInt( time[2]) || 0;
    return new Date(Date.UTC(2024, 1, 19, h, m));
  }
});