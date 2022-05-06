let mainAreaElement;
let sidebarElement;
let characterCardsElement;

function renderCharacter(name, status, species, image) {
    const cardCharacterElement = document.createElement('div');
    cardCharacterElement.className = 'character-card';
    mainAreaElement.appendChild(cardCharacterElement);
    
    // Add image source
    const characterImageElement = document.createElement('img');
    characterImageElement.src = image;

    // Add name
    const characterNameElement = document.createElement('div');
    characterNameElement.innerText = name;

    // Add specie and status
    const characterSpecieStatusElement = document.createElement('div');
    characterSpecieStatusElement.innerText = `${species} | ${status}`;

    cardCharacterElement.appendChild(characterImageElement);
    cardCharacterElement.appendChild(characterNameElement);
    cardCharacterElement.appendChild(characterSpecieStatusElement);
}

async function fetchCharacters(characterURLs) {
    // Map all urls to fetch promises
    const characterFetchPromises = characterURLs.map(characterURL => fetch(characterURL));
    // Transform the responses into JSON objects
    const resolvedFetchResponses = await Promise.all(characterFetchPromises);
    // Transform all responses into json promises
    const jsonPromises = resolvedFetchResponses.map(resolvedFetchResponse => resolvedFetchResponse.json());
    // Transform the json promise into a resolved json promise
    const resolvedJsonPromises = await Promise.all(jsonPromises);

    resolvedJsonPromises.forEach(characterJson => renderCharacter(characterJson.name, characterJson.status, characterJson.species, characterJson.image));

}

function updateMainArea(name, date, episodeCode, characterURLs) {
    // Clear what previously existed in the mainArea
    mainAreaElement.innerHTML = '';
    characterCardsElement.innerHTML = '';

    const titleElement = document.createElement('h2');
    titleElement.innerText = name;
    const dateAndCodeElement = document.createElement('h3');
    dateAndCodeElement.innerText = `${date} | ${episodeCode}`;

    mainAreaElement.appendChild(titleElement);
    mainAreaElement.appendChild(dateAndCodeElement);
    mainAreaElement.appendChild(characterCardsElement);

    fetchCharacters(characterURLs);  
}

function renderNextEpisodesButton(nextUrl) {  
   // Render next button
   if (!nextUrl) {
       return;
   }
   const nextButton = document.createElement('button');
   nextButton.className = 'next-list-button';
   nextButton.innerText = 'Next episodes';
   nextButton.addEventListener('click', _event => {
      console.log(nextUrl);
      fetch(nextUrl)
        .then(response => response.json())
        .then(json => {
           renderListOfEpisodes(json.results, json.info.next)
        });
    });
    sidebarElement.appendChild(nextButton);
}

function renderListOfEpisodes(episodes, nextUrl) {
    // Clean all the buttons insdide the sidebar
    document.querySelectorAll('.next-list-button').forEach(buttonElement => sidebarElement.removeChild(buttonElement));

    // Render all episodes
    episodes.forEach(episode => {
       const titleElement = document.createElement('p');
       titleElement.innerText = `Episode ${episode.id}`;
       sidebarElement.appendChild(titleElement);
       titleElement.addEventListener('click', _event => {
         updateMainArea(episode.name, episode.air_date, episode.episode, episode.characters);
        });
    });
    renderNextEpisodesButton(nextUrl);
}


function sidebar() {
    sidebarElement = document.createElement('div');
    sidebarElement.id = 'sidebar';
    document.querySelector('#root').appendChild(sidebarElement);
  // Query all the episodes information
  fetch('https://rickandmortyapi.com/api/episode')
    .then(response => response.json())
    .then(json => {
      renderListOfEpisodes(json.results, json.info.next);
        // Update main are with first episode
        const firstEpisode = json.results[0];
        updateMainArea(firstEpisode.name, firstEpisode.air_date, firstEpisode.episode, firstEpisode.characters);
    })
    .catch(
        errorMessage => console.error(errorMessage)
    );
};

function mainArea() {
    mainAreaElement = document.createElement('div');
    mainAreaElement.id = 'main-area';
    characterCardsElement = document.createElement('div');
    characterCardsElement.id = 'character-cards';
    mainAreaElement.appendChild(characterCardsElement);
    document.querySelector('#root').appendChild(mainAreaElement);
    // mainAreaElement.innerText = `This is my main area`;
}

sidebar();
mainArea();

// Promises
// Structure of the promise
const promiseFetch = new Promise((resolve, reject) => {
    // using URL
    // getting the information
    const response = 200;
    if (response !== 200) {
        reject(`Something went wrong, status code is not 200, it is: ${response}`);
    }
    resolve((response, 100)); // .then()
});

// //Structure of HOW to work with promises
// promiseFetch(
//     .then(
//         (response, code) => console.log(response, code) // 200, 100
//     )
//     .catch(
//         errorMessage => console.error(errorMessage) // ()
//     )
//     .finally(
//         () => console.log(`Finally, I'm done explaining promises`)
//     );
// )
