// do smooth scroll when clicking an #anchor link instead of jumping
document.addEventListener(`click`, e => {
  const origin = e.target.closest(`a`);
  if (!origin || !origin.href) return;
  
  var parts = origin.href.match(/^([^#]*)#(.+)/);
  var hash = parts[2];
  if (parts[1] === (window.location.origin + location.pathname) && hash) {
    
    // cancel jump
    e.preventDefault();

    var elmntToView = document.getElementById(hash);
    elmntToView.scrollIntoView({behavior: "smooth"}); 
  }
});
