const rootDiv = document.querySelector("#root");

//HEADER
const headerDiv = document.createElement("div");
headerDiv.classList.add("header");
const h1Header = document.createElement("h1");
h1Header.innerText = "Rick and Morty API";
const h2Header = document.createElement("h2");
h2Header.innerText = "by Amanda Maria";
const imageHeader = document.createElement("img");
imageHeader.src = "images/imageName.png";
headerDiv.appendChild(h1Header);
headerDiv.appendChild(h2Header);
headerDiv.appendChild(imageHeader);
rootDiv.appendChild(headerDiv);

//DIV BIGCONTAINER
const bigContainer = document.createElement("div");
bigContainer.classList.add("big-container");
rootDiv.appendChild(bigContainer);

//SIDEBAR
const sidebarDiv = document.createElement("div");
sidebarDiv.classList.add("sidebar");
bigContainer.appendChild(sidebarDiv);

const url = 'https://rickandmortyapi.com/api'

function sidebar(){
    fetch('https://rickandmortyapi.com/api/episode')
        .then(result => {
            return result.json()
        })
        .then(
            json => {
                console.log(json.results);
                json.results.forEach(episode => {
                    // const aTag = document.createElement('a');
                    const episodesTitle = document.createElement('p');
                    // aTag.appendChild(episodesTitle);
                    episodesTitle.innerText = `Episode ${episode.id}`;
                    sidebarDiv.appendChild(episodesTitle);
                    episodesTitle.addEventListener("click", event => {
                        createCard(episode.name, episode.air_date, episode.episode, episode.characters)
                    })
                });
            });
}
sidebar();

//MAIN CONTAINER
const mainContainer = document.createElement("div");
mainContainer.classList.add("main-cointainer");
bigContainer.appendChild(mainContainer);

function createCard(name, date, code, charactersURLs){
    console.log('clickado')
    // Clear main container
    mainContainer.innerHTML = " ";

    const episodeDiv = document.createElement("div");
    episodeDiv.classList.add("episode-div");

    //Episode's name
    const nameEp = document.createElement("h2");
    nameEp.innerText = `Episode ${name}`;
    episodeDiv.appendChild(nameEp);

    //Episode's date and code
    const dateEp = document.createElement("p");
    dateEp.innerText = `${date} | ${code}`;
    episodeDiv.appendChild(dateEp);

    //Create Div for cards
    const cardsDiv = document.createElement("div");
    cardsDiv.classList.add('cards-div')
    episodeDiv.appendChild(cardsDiv);

    renderCharacters(charactersURLs);

    mainContainer.appendChild(episodeDiv);
}

function renderCharacters(charactersURLs) {
    charactersURLs.forEach( characterURL => {
        fetch(characterURL)
        .then(result => {
            return result.json()
        })
        .then(character => {
            const containerCharacter = document.createElement("div");
            containerCharacter.classList.add("containerCharacter");

            const imageCharacter = document.createElement("img");
            imageCharacter.src = character.image;
            containerCharacter.appendChild(imageCharacter);

            const nameCharacter = document.createElement("p");
            nameCharacter.innerText = character.name;
            containerCharacter.appendChild(nameCharacter);

            const specieStatusCharacter = document.createElement('p');
            specieStatusCharacter.innerText = `${character.species} | ${character.status}`;
            containerCharacter.appendChild(specieStatusCharacter);

            document.querySelector('.cards-div').appendChild(containerCharacter);
        })
    })
}



 