// Create an app object. (moodApp)

// Create variables to hold apiURL and userQuery 

// Create separate arrays for each mood holding backgrounds and potential artists/genre

// A landing page greeting users with app title, and welcome message. 

// Form that includes user interaction. User will select from a drop down list of moods. *Use select element* (happy, sad, chill, energetic, romantic) 

// At the bottom of the form, user will click a submit button to see results. 

// Store user selections as a parameter. 

// When user submits data, make AJAX request to retrieve data based on the user mood selection to show recommended artist/genre. 

// If successful, a new page will appear with the users mood playlist/artist, rendering information about the song and music video to the HTML.
// If unsuccessful, display an error message

// Create an init method to initialize the app


// Namespace
const moodApp = {};

// Create Init
moodApp.init = () => {
    // moodApp.userQuery();
    // moodApp.url();
    moodApp.userInput();
};

// User Input
moodApp.userInput = () => {
    moodApp.formElement = document.querySelector('form');

    moodApp.formElement.addEventListener('submit', function (eventObj) {
        eventObj.preventDefault();
        moodApp.userMood = document.querySelector('option:checked').value;
        console.log(moodApp.userMood);

        moodApp.moodChoice = moodApp.userQuery[moodApp.userMood];
        console.log(moodApp.moodChoice);

        moodApp.insertArtist(moodApp.moodChoice[0].artist);
    })
};
moodApp.userQuery = {
    happy: [
        {
            artist: 'bruno+mars'
        }
    ],
    sad: [
        {
            artist: 'adele',
        },
        
    ],
    chill: [
        {
            artist: 'lana+del+rey',
        },
        
    ],
    romantic: [
        {
            artist: 'michael+buble'
        }
    ]
};

// const artist = 'bruno+mars';

moodApp.insertArtist = (artist) => {
    const url = new URL(`https://itunes.apple.com/search?`);
    url.search = new URLSearchParams({
        term: artist,
        entity: `musicTrack`
    });
    
    moodApp.url = fetch(url)
    .then( (res) => {
        return res.json();
    })
    .then( (jsonData) => {
        moodApp.displayResults(jsonData.results);
    })
}
// Display results on page
moodApp.displayResults = (jsonData) => {
    const resultsContainer = document.querySelector('.results');
   
    const resultDivElement = document.createElement('div');
    jsonData.forEach((results) => {

        // Adding song, artist, and album art
         resultDivElement.innerHTML = 
        `
      <div class="titleContainer">
            <h3 class="songTitle"> ${results[0].trackName} </h3>
            <p class="artistName"> ${results.artistName} </p>
        </div>
        <div class="albumArt">
            <img src="${results.artworkUrl100}" alt="${results.collectionName}" >
        </div>
        <audio controls src="${results.previewUrl}"></audio>
        <button onClick="window.location.reload();" class="resetButton">Change your mind?</button>
        `

        resultsContainer.append(resultDivElement);
    })
}

// Call Init
moodApp.init();
