

civicKey = 'AIzaSyABhC00ndBtZ48N0AC1XfQG911F09gmit8';

function getVoterQueryInfo() {
  let apiUrl = "https://www.googleapis.com/civicinfo/v2/voterInfoQuery?key="+civicKey;

  fetch(apiUrl,{
    method:"POST",
    body: JSON.stringify(data),
    mode: "no-cors",
    headers: {
      'Content-Type': 'application/json',
    }
  }
  ).then(function(response) {
    if(response.ok){
      console.log(data);
    }
  })
}

getVoterQueryInfo();