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
    moodApp.userInput();
};

// User Input
moodApp.userInput = () => {
    moodApp.formElement = document.querySelector('form');

    moodApp.formElement.addEventListener('submit', function (eventObj) {
        eventObj.preventDefault();
        document.getElementById('moodButton').disabled = true;
        moodApp.userMood = document.querySelector('option:checked').value;
        
        moodApp.moodChoice = moodApp.userQuery[moodApp.userMood];
        // Randomize song
        const randomSong = moodApp.moodChoice[Math.floor(Math.random() * moodApp.moodChoice.length)];

        moodApp.insertArtist(randomSong.song);
    })
};
// Happy mood choice is not working with Netlify, but works when opened through VS Code. 
moodApp.userQuery = {
    happy: [
        {
            song: 'happy',
        },
        {
            song: `don't+worry+be+happy`
        },
        {
            song: 'good+as+hell'
        }
    ],
    sad: [
        {
            song: 'hello',
        },
        {
            song: 'the+scientist'
        },
        {
            song: 'listen+before+i+go'
        }

    ],
    chill: [
        {
            song: 'summertime+sadness ',
        },
        {
            song: 'sunday+best'
        },
        {
            song: 'after+last+night'
        }

    ],
    romantic: [
        {
            song: 'at+last'
        },
        {
            song: `can't+help+falling+in+love`
        },
        {
            song: 'drunk+in+love'
        }
    ]
};


moodApp.insertArtist = (song) => {
    const url = new URL(`https://itunes.apple.com/search?`);
    url.search = new URLSearchParams({
        term: song,
        entity: `musicTrack`,
    });

    moodApp.url = fetch(url)
        .then((res) => {
            if(res.ok === true) {
                return res.json();
            }
        })
        .then((jsonData) => {
            moodApp.displayResults(jsonData.results);
            
        })
        .catch( (err) => {
            if(err.message) {
                alert("Sorry, something went wrong. The mood guru is working on it.????");
            }
        })
}
// Display results on page
moodApp.displayResults = (jsonData) => {
    
    const resultsContainer = document.querySelector('.results');

    let content = "";
    const resultDivElement = document.createElement('div');
    resultDivElement.classList.add("resultsContainer");
    for (let i = 0; i < jsonData.length; i++) {
        content = jsonData[0];
        // Adding song, artist, and album art
        resultDivElement.innerHTML =
            `
            <div class="titleContainer">
                <h3 class="songTitle"> ${content.trackName} </h3>
                <p class="artistName"> ${content.artistName} </p>
            </div>
            <div class="mediaContainer">
                <div>
                    <img class="albumArt" src="${content.artworkUrl100}" alt="${content.collectionName}" >
                </div>
                <audio controls src="${content.previewUrl}"></audio>
                <button onClick="window.location.reload();" class="resetButton">Change your mind?</button>
            </div>
        `
        resultsContainer.append(resultDivElement);
    }
}

// Call Init
moodApp.init();
