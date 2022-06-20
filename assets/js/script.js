// Element variables
var localHeaderEl = $('#local-info');
var stateHeaderEl = $('#state-info');
var federalHeaderEl = $('federal-info');
var searchInputEl = ('#search-input');
var localBoxEl = $('#local-container');
var stateBoxEl = $('#state-container');
var federalBoxEl = $('#federal-container');

// Variables needed in global scope
var officeName = '';
var officialName = '';
var party = '';
var addressLine1 = '';
var addressCity = '';
var addressState = '';
var addressZip = '';
var phone = '';
var email = '';
var officialWebsite = '';
var wikiSite = '';
var facebookId = '';
var twitterId = '';
var youTubeId = '';
var repArray = [];

var address = '63119';

const civicKey = 'AIzaSyABhC00ndBtZ48N0AC1XfQG911F09gmit8';
const proPublicaKey = '2pNm5c6OoX6Qs8joxqGptlpExvwrg9hxzGxzj3GE';
const openSecretsKey = '790149a888a39934e82a2ad7234b7043';

function getRepresentatives(address) {
  let apiUrl = "https://www.googleapis.com/civicinfo/v2/representatives?address=63119&key="+civicKey;

  // redirects to proxy server for CORS workaround
  jQuery.ajaxPrefilter(function(apiUrl) {
    if (apiUrl.crossDomain && jQuery.support.cors) {
        apiUrl = 'https://whispering-bastion-84455.herokuapp.com/' + apiUrl;
    }
  });


  /* Levels:
      Country: Federal
      administrativeArea1: State
      administrativeArea2: Local */
  fetch(apiUrl).then(function(response) {
    if(response.ok){
      response.json().then(function(data){
        console.log(data);
        for(var i=0;i<data.offices.length;i++) {
            officeName = data.offices[i].name;
            officialName = data.officials[data.offices[i].officialIndices[0]].name;
            party = data.officials[data.offices[i].officialIndices[0]].party;

            if(!data.officials[data.offices[i].officialIndices[0]].address) {
              addressLine1='No address information available';
            } else {
              addressLine1 = this[0].line1;
              addressCity = this[0].city;
              addressState = this[0].state;
              addressZip = this[0].zip;
            }
            
            phone = data.officials[data.offices[i].officialIndices[0]].phones[0];
            
            if(!data.officials[data.offices[i].officialIndices[0]].emails) {
              email = 'No email available';
            } else {
              email = this[0];
            }
      
            if(!data.officials[data.offices[i].officialIndices[0]].urls) {
              officialWebsite = 'No website available';
            } else {
              officialWebsite = this[0];
            }
      
            if(!data.officials[data.offices[i].officialIndices[0]].urls) {
              wikiSite = 'No website available';
            } else {
              wikiSite= this[1];
            }
      
            for(let i=0;i<data.officials[data.offices[i].officialIndices[0]].channels.length;i++) {
              if(this.type = 'Facebook') {
                facebookId = 'facebook.com/'+this.id;
              } else if(this.type='Twitter') {
                twitterId = 'twitter.com/'+this.id;
              } else {
                facebookId = 'Not available';
                twitterId = 'Not available';
              }
            }
          }
      })
    }
  })
}

function search() {
  var address = $(searchInputEl).val();

  getRepresentatives(address);

  // document.location.replace('./results.html');

  // var stateCode = data.normalizedInput.state;

  // getOSLegislators(stateCode);


  federalHeaderEl.append(
    `<h3 class='office-name>${officeName}</h3>
      <h4 class='official-name'>${officialName}</h4>
      <p class='party'>${party}</p>
      <div id='contact-info'>
        <address class='address'>${addressLine1}<br />
        ${addressCity}, ${addressState} ${addressZip}<br />
        P: ${phone}<br />
        E: ${email}
        </address>
      </div>
      <div id='information'>
        <p>Official website: ${officialWebsite}</p><br />
        <p>Wikipedia: ${wikiSite}</p>
      </div>
      <div id='social-media'>
        <p id='facebook'>Facebook: ${facebookId}</p>
        <p id='twitter'>Twitter: ${twitterId}</p>
      </div>
      `
  )
}


search(address);

// function getCongressionalInfo() {
//   let apiUrl = 'https://api.propublica.org/congress/v1/';

//   jQuery.ajaxPrefilter(function(apiUrl) {
//     if (apiUrl.crossDomain && jQuery.support.cors) {
//         apiUrl = 'https://whispering-bastion-84455.herokuapp.com/' + apiUrl;
//     }
//   });

//   fetch(apiUrl).then(function(response){
//     if(response.ok) {
//       response.json().then(function(data){
//         console.log(data);
//       })
//     }
//   })
// }

// getCongressionalInfo();

function getMemPFDProfile () {
  let apiUrl = 'http://www.opensecrets.org/api/?method=memPFDprofile&year=2016&cid=N00007360&output=json&apikey='+openSecretsKey;

  fetch(apiUrl).then(function(response) {
    if(response.ok) {
      response.json().then(function(data){
        console.log(data);
      })
    }
  })
}

getMemPFDProfile();

function getOSLegislators(stateCode) {
  let apiUrl = 'http://www.opensecrets.org/api/?method=getLegislators&id=MO&output=json&apikey='+openSecretsKey

  fetch(apiUrl).then(function(response) {
    if(response.ok) {
      response.json().then(function(data){
        console.log(data);
      })
    }
  })
}

getOSLegislators();