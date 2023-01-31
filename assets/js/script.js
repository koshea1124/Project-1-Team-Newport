var submitEl = document.querySelector('#submit-button')
var searchEl = document.querySelector('#search-criteria')
var videoList = document.querySelector('.video-links')
var videoContainer = document.getElementById('video-container')
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
                var youTubeLinkEl = document.createElement('a');
                youTubeLinkEl.href = baseYouTubeUrl + searchResultId
                youTubeLinkEl.textContent = baseYouTubeUrl + searchResultId
                console.log(youTubeLinkEl)
                videoContainer.append(youTubeLinkEl)
               // var id = data[i].id.videoId
                //videoIds.textContent = data[i].id.videoId;
                //videoContainer.appendChild(videoIds);
            }
        })
}
submitEl.addEventListener('click', getApi);
