


var address = '63119'

const civicKey = 'AIzaSyABhC00ndBtZ48N0AC1XfQG911F09gmit8';
// const proPublicaKey = '2pNm5c6OoX6Qs8joxqGptlpExvwrg9hxzGxzj3GE';

// var cors_proxy = require('cors-anywhere');
// cors_proxy.createServer({
//     originWhitelist: [], // Allow all origins
//     requireHeader: [],
//     removeHeaders: []
// });



function getRepresentatives() {
  let apiUrl = "https://www.googleapis.com/civicinfo/v2/representatives?address="+address+"&key="+civicKey;

  jQuery.ajaxPrefilter(function(apiUrl) {
    if (apiUrl.crossDomain && jQuery.support.cors) {
        apiUrl = 'https://whispering-bastion-84455.herokuapp.com/' + apiUrl;
    }
  });

  fetch(apiUrl).then(function(response) {
    if(response.ok){
      response.json().then(function(data){
        console.log(data);
      })
    }
  })
}

getRepresentatives();

// gapi.load("client");

// function loadClient() {
//   gapi.client.setApiKey("AIzaSyABhC00ndBtZ48N0AC1XfQG911F09gmit8");
//   gapi.client.init({'clientId':'527860627972-ehld45ijhia5a8a1snjr2u72ha2m0mah.apps.googleusercontent.com'})
//   return gapi.client.load("https://civicinfo.googleapis.com/$discovery/rest?version=v2")
//       .then(function() { console.log("GAPI client loaded for API"); },
//             function(err) { console.error("Error loading GAPI client for API", err); });
// }
// // Make sure the client is loaded before calling this method.
// function execute() {
//   return gapi.client.civicinfo.representatives.representativeInfoByAddress({
//     "address": "63119",
//     "includeOffices": false,
//     "levels": [
//       "regional"
//     ]
//   })
//       .then(function(response) {
//               // Handle the results here (response.result has the parsed body).
//               console.log("Response", response);
//             },
//             function(err) { console.error("Execute error", err); });
// }


// loadClient();
// execute();

// function getCongressionalInfo() {
//   var apiUrl = 'https://api.propublica.org/congress/v1/117';

//   fetch(apiUrl,{
//     headers: {"Authorization":"X-API-Key: 2pNm5c6OoX6Qs8joxqGptlpExvwrg9hxzGxzj3GE"}
//   }).then(function(response){
//     if(response.ok) {
//       response.json().then(function(data){
//         console.log(data);
//       })
//     }
//   })
// }

// getCongressionalInfo();