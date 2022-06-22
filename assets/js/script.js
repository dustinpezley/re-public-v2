// Element variables
var localHeaderEl = $('#local-info');
var stateHeaderEl = $('#state-info');
var federalHeaderEl = $('#federal-info');
var searchInputEl = ('#search-input');
var localBoxEl = $('#local-container');
var stateBoxEl = $('#state-container');
var federalBoxEl = $('#federal-container');
var contributionsEl = $('#contributions-container');
var candidateSummaryEl = '';

// Variables needed in global scope
var officeName = '';
var officeLevel = '';
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
var userState = '';
var official_full = '';
var openSecretsID = '';
var bioGuideId = '';
var candidateCash = '';
var candidateDebt = '';
var candidateFirstElected = '';
var candidateNextElection = '';
var candidateExpenditures = '';
var candidateTotalReceipts = '';
var candidateSource = ''
var candidateLastUpdated = '';
var contributorArray = [];
var contributorCycle = '';
var contributorHTML= '';
var crpNotice='';
var crpOrigin='';
var crpSource='';

const civicKey = 'AIzaSyABhC00ndBtZ48N0AC1XfQG911F09gmit8';
const proPublicaKey = '2pNm5c6OoX6Qs8joxqGptlpExvwrg9hxzGxzj3GE';
const openSecretsKey = '790149a888a39934e82a2ad7234b7043';
const govInfoKey = 'eEd0GvTqXamQlTNTBaSkUhVDEbfQrHIT6W1qxaZy';

var address = '63119';

function getRepresentatives(address) {
  let apiUrl = "https://www.googleapis.com/civicinfo/v2/representatives?address=25%20W%20Rose%20Ave%20Webster%20Groves%2C%20MO&key="+civicKey;

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
        userState = data.normalizedInput.state;
        let senatorCopy = [...data.offices.slice(2,3)];
        senatorCopy = JSON.stringify(Object.assign(senatorCopy[0]));
        data.offices.splice(3, 0, JSON.parse(senatorCopy));
        data.offices[2].officialIndices.splice(1,1);
        data.offices[3].officialIndices.splice(0,1);
        console.log(data);
        for(var i=0;i<data.offices.length;i++) {
          officeName = data.offices[i].name;
          officeLevel = data.offices[i].levels[0];
          officialName = data.officials[data.offices[i].officialIndices[0]].name;
          party = data.officials[data.offices[i].officialIndices[0]].party;

          // Get ID information from govinfo from congressional members only
          if(officeName === 'U.S. Senator' || officeName === 'U.S. Representative') {
            official_full = JSON.parse(JSON.stringify(officialName));
            console.log(official_full)
            // Define govinfo variables for use in html write

            getLegislatorIDs(official_full);
          }

          // If address exists, define variables
          if(!data.officials[data.offices[i].officialIndices[0]].address) {
            addressLine1='No address information available';
          } else {
            addressLine1 = data.officials[data.offices[i].officialIndices[0]].address[0].line1;
            addressCity = data.officials[data.offices[i].officialIndices[0]].address[0].city;
            addressState = data.officials[data.offices[i].officialIndices[0]].address[0].state;
            addressZip = data.officials[data.offices[i].officialIndices[0]].address[0].zip;
          }
          
          // Grab phone number
          phone = data.officials[data.offices[i].officialIndices[0]].phones[0];
          
          // If emails exist, define the variable using the first index
          if(!data.officials[data.offices[i].officialIndices[0]].emails) {
            email = 'No email available';
          } else {
            email = data.officials[data.offices[i].officialIndices[0]].emails[0];
          }
    
          // If websites exist, grab them. Default is official first, then Wikipedia
          if(!data.officials[data.offices[i].officialIndices[0]].urls) {
            officialWebsite = 'No website available';
          } else {
            officialWebsite = data.officials[data.offices[i].officialIndices[0]].urls[0];
          }

          // If social media channels do not exist, note it. Otherwise, loop through each and get Facebook and Twitter IDs
          if(!data.officials[data.offices[i].officialIndices[0]].channels) {
            facebookId = 'Not available';
            twitterId = 'Not available';
          } else{
            let j=0;
            while (j<data.officials[data.offices[i].officialIndices[0]].channels.length) {
              var channelType = data.officials[data.offices[i].officialIndices[0]].channels[j].type;
              var channelId = data.officials[data.offices[i].officialIndices[0]].channels[j].id;
              facebookId = 'Not available';
              twitterId = 'Not available';
              
  
              if(channelType === 'Facebook') {
                facebookId = 'facebook.com/'+channelId;
              } else if(channelType==='Twitter') {
                twitterId = 'twitter.com/'+channelId;
              }
              j++;
            }
          }   

          // Div definition for insert using template literal
          let htmlInsert = 
          `<div class='official-container accordion-content' data-tab-content>
            <h3 class='office-name'>${officeName}</h3>
            <h4 class='official-name'>${officialName}</h4>
            <p class='party'>${party}</p>
            <div id='contact-info'>
              <address class='address'>
                ${addressLine1}<br />
                ${addressCity}, ${addressState} ${addressZip}<br />
                P: ${phone}<br />
                E: ${email}
              </address>
            </div>
            <div id='information'>
              <p>Official website: ${officialWebsite}</p>
            </div>
            <div id='social-media'>
              <p id='facebook'>Facebook: ${facebookId}</p>
              <p id='twitter'>Twitter: ${twitterId}</p>
            </div>
          </div>
          `

          // Depending on level as defined in Civic Info API, append to appropriate div
          if(officeLevel === 'administrativeArea2') {
            $(localHeaderEl).append($(htmlInsert));
          } else if (officeLevel === 'administrativeArea1') {
            $(stateHeaderEl).append($(htmlInsert));
          } else if (officeLevel === 'country') {
            $(federalHeaderEl).append($(htmlInsert));
          };

          if(officeName === 'U.S. Senator' || officeName === 'U.S. Representative') {
            if(officeLevel === 'administrativeArea2') {
              $(localHeaderEl).append(`
              <div id='contributors-container'>
                <ol class='contributors' id='contributor-list'>Top Contributors</ol>
              </div>
              `);
            } else if (officeLevel === 'administrativeArea1') {
              $(stateHeaderEl).append(`
              <div id='contributors-container'>
                <ol class='contributors' id='contributor-list'>Top Contributors</ol>
              </div>
              `);
            } else if (officeLevel === 'country') {
              $(federalHeaderEl).append(`
              <div id='contributors-container'>
                <ol class='contributors' id='contributor-list'>Top Contributors</ol>
              </div>
              `);
            };
          }
          contributionsEl = $('#contributors-container');
        }
      })
    }
  })
}

function search() {
  var address = $(searchInputEl).val();

  getRepresentatives(address);

  // document.location.replace('./results.html');
}


search(address);

function getCandContrib (openSecretsID) {
  let apiUrl = 'https://www.opensecrets.org/api/?method=candContrib&cid='+openSecretsID+'&output=json&apikey='+openSecretsKey;

  fetch(apiUrl).then(function(response) {
    if(response.ok) {
      response.json().then(function(data){
        console.log(data);
        crpNotice =  data.response.contributors['@attributes'].notice;
        crpOrigin =  data.response.contributors['@attributes'].origin;
        crpSource =  data.response.contributors['@attributes'].source;
        contributorCycle =  data.response.contributors['@attributes'].cycle;
        contributorArray = data.response.contributors.contributor;

        console.log(contributorArray);
        
        // Define HTML for list items for each contributor
        for(var i=0;i<contributorArray.length;i++) {
          contributorHTML =
            `
            <li>${contributorArray[i]['@attributes'].org_name}<br />
              <p class='total-contributions'>Total Contributions: <span class='total-cont-dollars'>${contributorArray[i]['@attributes'].total}</span></p>
              <p class='individual-contributions'>Individual Contributions: <span class='indiv-cont-dollars'>${contributorArray[i]['@attributes'].indivs}</span></p>
              <p class='pac-contributors'>PAC Contributions: <span class='pac-cont-dollars'>${contributorArray[i]['@attributes'].pacs}</span></p>
            </li>
            `;

          // Append defined HTML to container element defined in search results

        }
        // <p class='notice'>${crpNotice}</p>
        // <p class='origin'>${crpOrigin}</p>
        // <p class='source'>${crpSource}</p>
      })
    }
  })
}

function getLegislatorIDs(official_full) {
  let apiUrl = 'https://theunitedstates.io/congress-legislators/legislators-current.json'

  fetch(apiUrl).then(function(response) {
    if(response.ok) {
      response.json().then(function(data) {
        var indexResult = data.findIndex(data => (data.name.official_full === official_full) ? true : false);
        openSecretsID = data[indexResult].id.opensecrets;
        bioGuideId = data[indexResult].id.bioguide;

        getCandSummary(openSecretsID);
        getCandContrib(openSecretsID);

      })
    }
  })
}

function getCandSummary(openSecretsID) {
  let apiUrl = 'http://www.opensecrets.org/api/?method=candSummary&cid='+openSecretsID+'&output=json&apikey='+openSecretsKey;

  fetch(apiUrl).then(function(response) {
    if(response.ok) {
      response.json().then(function(data) {
        console.log(data);
      })
    }
  })
}

function getGovInfo() {
  let apiUrl = 'https://api.govinfo.gov/packages/CREC-2018-01-04/summary?api_key='+govInfoKey;

  fetch(apiUrl).then(function(response) {
    if(response.ok) {
      response.json().then(function(data) {
        console.log(data);
      })
    }
  })
}