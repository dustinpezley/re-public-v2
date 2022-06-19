


var address = '63119'

const civicKey = 'AIzaSyABhC00ndBtZ48N0AC1XfQG911F09gmit8';
const proPublicaKey = '2pNm5c6OoX6Qs8joxqGptlpExvwrg9hxzGxzj3GE';
const openSecretsKey = '790149a888a39934e82a2ad7234b7043';

function getRepresentatives() {
  let apiUrl = "https://www.googleapis.com/civicinfo/v2/representatives?address="+address+"&key="+civicKey;

  // redirects to proxy server for CORS workaround
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