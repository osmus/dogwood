// do smooth scroll when clicking an #anchor link instead of jumping
document.addEventListener('click', function(e) {
  const origin = e.target.closest(`a`);
  if (!origin || !origin.href) return;
  
  var parts = origin.href.match(/^([^#]*)#(.+)/);
  if (parts && parts.length >=3 && parts[1] === (window.location.origin + location.pathname) && parts[2]) {
    
    // cancel jump
    e.preventDefault();

    var elmntToView = document.getElementById(parts[2]);
    elmntToView.scrollIntoView({behavior: "smooth"}); 
  }
});
