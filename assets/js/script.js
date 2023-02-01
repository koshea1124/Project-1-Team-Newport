var submitEl = document.querySelector('#submit-button')
var searchEl = document.querySelector('#search-criteria')
var videoList = document.querySelector('.video-container')
var videoContainer = document.querySelector('video-container')
var wgerContainer = document.querySelector('.wger-container')
var baseYouTubeUrl = 'https://www.youtube.com/watch?v='

// when button is clicked a total of five workout videos  will appear and be embedded on the page to bypass admin firewalls if necessary and give user the option to click next or previous to cycle through the 5 videos and with what body xone is picked it will add that to the end of the randomization que for the rest of the week 
// an array of the 5 body zones should be made with also 2 rest days 
//  arms legs chest back cardio and 2 rest days 
// utilize local storage to rember what was randomly picked the day before so that zone will not be targeted 2 days in a row 
// 


function getApi() {
    var requestUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=workout&type=video&key=AIzaSyBXboQ45fZexXG4TsEN7gPkwLZrXpfQQIs';
    document.querySelector('#video-container').style='display:block;';
    searchEl.style='display:none;';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.items);
            //looping thru fetch responses
            for (var i = 0; i < data.items.length; i++) {
                var searchResult = data.items[i];
                var searchResultId = searchResult.id.videoId
                var listItem = document.createElement('li');
                var youTubeLinkEl = document.createElement('a');
                youTubeLinkEl.href = baseYouTubeUrl + searchResultId
                youTubeLinkEl.textContent = baseYouTubeUrl + searchResultId
                listItem.append(youTubeLinkEl);
                videoList.append(listItem);
               
            }
        })
}

function getApi2 () {
    var requestUrl2 = 'https://wger.de/api/v2/equipment/';

    fetch(requestUrl2, {
        method: "GET",
        headers: {
          "Authorization": "Token " + "dfb13c13d89ad44c777ff2716bf1fc3b51b70992"
        }
      })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.results);
            for (var i =0; i < data.results.length; i++) {
                var searchResult2 = data.results[i];
                var searchResultId2 = searchResult2.name
                var listItem2 =document.createElement('li');
                listItem2.textContent = searchResultId2
                wgerContainer.append(listItem2);   
            
        }
        })
    }
submitEl.addEventListener('click', getApi);
submitEl.addEventListener('click', getApi2);