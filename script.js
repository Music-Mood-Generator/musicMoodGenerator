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


// Object to hold our music information

const userQuery = 'bruno+mars';

// const apiURL = `https://itunes.apple.com/search?term=${userQuery}&entity=musicTrack`;


const url = new URL(`https://itunes.apple.com/search?`);
url.search = new URLSearchParams({
    term: `${userQuery}`,
    entity: `musicTrack`
});

fetch(url);