document.addEventListener("DOMContentLoaded", function() {

  var scheduleRowsToCheck = document.querySelectorAll('table.schedule tr[start][end]');

  if (scheduleRowsToCheck.length > 0) {
    setInterval(checkScheduleRows, 1000);
    checkScheduleRows();
  }

  function checkScheduleRows() {
    var now = new Date();
    scheduleRowsToCheck.forEach(function(el) {
      var start = new Date(parseInt(el.getAttribute('start') + '000'));
      var end = new Date(parseInt(el.getAttribute('end') + '000'));
      if (now >= start && now < end) {
        if (!el.classList.contains('ongoing')) {
          el.classList.add('ongoing');
        }
      } else if (el.classList.contains('ongoing')) {
        el.classList.remove('ongoing');
      }
    });
  }

  var homepageUrl = document.querySelector('meta[name="homepage"]').getAttribute('content');
  var nextEventEl = document.querySelector('meta[name="dogwood-next-event"]');
  if (nextEventEl) createRealtimeMessage();

  function createRealtimeMessage() {

    var title = nextEventEl.getAttribute('content');

    var noticeInfo = JSON.parse(localStorage.getItem('notice-info')) || null;
    if (noticeInfo && noticeInfo.title !== title)  {
      localStorage.removeItem('notice-info');
      noticeInfo = null;
    }

    var end = new Date(parseInt(nextEventEl.getAttribute('end') + '000'));
    var now = new Date();

    // don't show something that's over
    if (now > end) return;

    var link = nextEventEl.getAttribute('href');

    // don't show if we're already on the promoted part of the site
    if (window.location.href.startsWith(link) || 
      // or if we're on the homepage since content is already promoted there
      window.location.href === homepageUrl + '/') return;

    var start = new Date(parseInt(nextEventEl.getAttribute('start') + '000'));

    if (now < start &&
        noticeInfo &&
        now.getTime() < noticeInfo.clicked + 172800000
        ) {
      // don't notify again if event hasn't started yet and it's been under two days since last notified
      return;
    }

    var tagline = nextEventEl.getAttribute('tagline');
    var logo = nextEventEl.getAttribute('logo');
    
    var notice = document.createElement('a');
    notice.setAttribute('href', link);
    notice.setAttribute('id', 'notice-overlay');
    notice.classList.add(nextEventEl.getAttribute('noticeclass'));
    var html = '';

    if (logo) {
      html += '<img class="logo" src="' + logo + '"/>';
    }
    html += '<div class="messages">';
    var status = start > now ? 'Upcoming' : 'Happening Now';
    html += '<div class="status-bubble">' + status + '</div>';
    html += '<p><b>' + title + '</b><br/>' + tagline + '</p>'
    html += '</a>';
    
    notice.innerHTML = html;
    document.body.appendChild(notice);

    notice.addEventListener('click', function() {
      localStorage.setItem('notice-info', JSON.stringify({
        title: title,
        clicked: now.getTime()
      }));
    });
  }
});