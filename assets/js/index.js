// Foundation elements
$(document).foundation();
var menuEl = $('.menu');
var elem = new Foundation.OffCanvas(menuEl);

var searchHistory = [];

// Search functionality 
var input = document.getElementById('search-input');

input.addEventListener('keypress', function(event) {
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
  var address = encodeURIComponent($(searchInputEl).val().trim());
  var addressStorage = $(searchInputEl).val().trim();

  searchHistory.push(addressStorage);
  console.log(searchHistory);
  localStorage.setItem("autocompleteOptions", JSON.stringify(searchHistory));

  getRepresentatives(address);

  // location.href='./results.html';
}

function loadStorage() {
  var historyLoad = localStorage.getItem("autocompleteOptions");

  if(!historyLoad) {
    return false;
  }

  searchHistory=JSON.parse(historyLoad);  
}

function autocompleteMatch(input) {
  if (input == '') {
    return [];
  }
  var reg = new RegExp(input)
  return searchHistory.filter(function(term) {
	  if (term.match(reg)) {
  	  return term;
	  }
  });
}

function showResults(val) {
  res = document.getElementById("result");
  res.innerHTML = '';
  let list = '';
  let terms = autocompleteMatch(val);
  for (i=0; i<terms.length; i++) {
    list += '<li class="result-item">' + terms[i] + '</li>';
  }
  res.innerHTML = '<ul class="result-list">' + list + '</ul>';
}

$('.result-list').on('click',function() {
  var content = $(this).text();

  $(searchInputEl).val(content);
})

loadStorage();