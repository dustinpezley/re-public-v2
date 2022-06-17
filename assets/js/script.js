var address = ''

const civicKey = 'AIzaSyABhC00ndBtZ48N0AC1XfQG911F09gmit8';

function getVoterQueryInfo() {
  let apiUrl = "https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=25%20W%20Rose%20Ave%20Webster%20Groves%2C%20MO&includeOffices=true&key="+civicKey;

  fetch(apiUrl,{mode: "no-cors"}).then(function(response) {
    if(response.ok){
      console.log(data);
    }
  })
}

getVoterQueryInfo();