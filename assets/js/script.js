var submitEl = document.querySelector('#submit-button')
var searchEl = document.querySelector('#search-criteria')
var videoList = document.querySelector('.video-container')
var videoContainer = document.querySelector('video-container')
var wgerContainer = document.querySelector('.wger-container')
var baseYouTubeUrl = 'https://www.youtube.com/watch?v='
var weightButton = document.getElementById('weight-button')
var goalWeightEl = document.getElementById('goal-weight')
var inputWeightEl = document.getElementById('user-weight')

function getLocalStorage (){
    var userWeight = JSON.parse(localStorage.getItem('input-weight'));
    return userWeight;
}
function printWeight (){
    goalWeightEl.innerHTML = ''
    var storedWeight = getLocalStorage();
    var weightEl = document.createElement('h3')
    weightEl.textContent = storedWeight
    goalWeightEl.appendChild(weightEl)
    inputWeightEl.value = ''
}
weightButton.addEventListener("click", function(e){
   e.preventDefault()
    var inputWeight = inputWeightEl.value
    console.log(inputWeight);
    localStorage.setItem('input-weight', JSON.stringify(inputWeight))
    printWeight();
});

function getApi() {
    var requestUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=workout&type=video&key=AIzaSyBXboQ45fZexXG4TsEN7gPkwLZrXpfQQIs';
    document.querySelector('#video-container').style='display:block;';
    searchEl.style='display:none;';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
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
printWeight ();
submitEl.addEventListener('click', getApi);
submitEl.addEventListener('click', getApi2);