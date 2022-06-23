// Foundation elements
$(document).foundation();
var menuEl = $('.menu');
var elem = new Foundation.OffCanvas(menuEl);


// Search functionality 
var input = document.getElementById('search-input');

input.addEventListener('keypress', function(event) {
  console.log(event.key);
  if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById('search-button').click();
  }
})

$(searchButtonEl).on("click",searchInputEl,function(){
  search(searchInputEl);
  return false;
})

function search(searchInputEl) {
  var address = encodeURIComponent($(searchInputEl).val());

  getRepresentatives(address);

  location.href='./results.html';
}