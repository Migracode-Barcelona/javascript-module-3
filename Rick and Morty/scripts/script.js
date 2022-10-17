// Save Urls into global variables 
const url = 'https://rickandmortyapi.com/api'
let episodesUrl = "https://rickandmortyapi.com/api/episode"
const locationsUrl = "https://rickandmortyapi.com/api/location"

//Utility functions
const getResponse = (res) => { return res.json() }

// Step 1 create the web structure

//1.0.1 bootstrap layout  title
const titleDivRow = document.createElement('div')
titleDivRow.classList.add('row', 'mt-5')
const titleDiveCol = document.createElement('div')
titleDiveCol.classList.add('col-8')
titleDivRow.appendChild(titleDiveCol)
const rootDiv = document.getElementById("root")
rootDiv.classList.add('container')
rootDiv.appendChild(titleDivRow)

//1.0.2 bootstrap layout sidebar and body

const contentDivRow = document.createElement('div')
contentDivRow.classList.add('row', 'mt-3')

const contentSidebarDivCol = document.createElement('div')
contentSidebarDivCol.classList.add('col-3', 'side-bar')

const contentBodyDivCol = document.createElement('div')
contentBodyDivCol.classList.add('col-9', 'content-body')

contentDivRow.appendChild(contentSidebarDivCol)
contentDivRow.appendChild(contentBodyDivCol)
rootDiv.appendChild(contentDivRow)


const showEpisodesButtonDiv = document.createElement('div')
showEpisodesButtonDiv.classList.add('py-3')


// Step 1.1.0 create the show more button
//Create button div

contentSidebarDivCol.appendChild(showEpisodesButtonDiv)

//Creat button
const showMorePageBtn = document.createElement('button')
showMorePageBtn.setAttribute('id', 'show-more-page-btn')
showMorePageBtn.classList.add('btn-dark', 'btn')
showMorePageBtn.innerText = "Load Episodes"

//Append button element to the div
showEpisodesButtonDiv.appendChild(showMorePageBtn)



//Step 2 Display episode lists in the sidebar 

// 2.1 Fetch episodes data and display them in the sidebar 
const displayEpisodeLists = () => {
    //create list div
    const episodeListsDiv = document.createElement('div')
    contentSidebarDivCol.insertBefore(episodeListsDiv, showEpisodesButtonDiv)

    //create html list elements
    const episodesUl = document.createElement('ul')
    episodesUl.classList.add('list-group')
    episodeListsDiv.appendChild(episodesUl)

    //Fetch episodes data
    if (episodesUrl) {
        fetch(episodesUrl)
            .then(getResponse)
            .then(data => {
                const episodes = data.results
                episodes.forEach(episode => {
                    //Empty the content div
                    contentBodyDivCol.innerHTML = ""

                    const episodeLi = document.createElement('li')
                    episodeLi.classList.add('list-group-item', 'episode-item')
                    const episodeLiLink = document.createElement('a')
                    episodeLiLink.classList.add('link-dark')
                    episodeLiLink.innerText = `Episode ${episode.episode}`
                    episodeLiLink.setAttribute('id', `episode-${episode.id}`)

                    episodeLiLink.setAttribute('href', '#')
                    episodeLi.appendChild(episodeLiLink)
                    episodesUl.appendChild(episodeLi)
                    //add eventlistner to each list item
                    episodeLiLink.addEventListener('click', (e) => {
                        displayEpisode(episode.url)
                    })
                })
                episodesUrl = data.info.next
            })
    }
}
//Load the first page of episode lists
displayEpisodeLists()

//Set up show more button
showMorePageBtn.addEventListener('click', () => {
    displayEpisodeLists()
})


// Step 3 Display the episode that is clicked by the user
const displayEpisode = (episodeUrl) => {
    //clear the main div
    contentBodyDivCol.innerHTML = ""

    //Fetch episode data
    fetch(episodeUrl)
        .then(getResponse)
        .then(data => {
            const episode = data

            const episodeInfo = document.createElement('h5')
            episodeInfo.classList.add('py-2')
            episodeInfo.innerText = `${episode.name} `
            const episodeInfoBody = document.createElement('p')
            episodeInfoBody.classList.add('text-muted', 'fw-light', 'py-2')
            episodeInfoBody.innerText = `${episode.air_date} | ${episode.episode}`
            contentBodyDivCol.appendChild(episodeInfo)
            contentBodyDivCol.appendChild(episodeInfoBody)
            const characters = episode.characters
            displayCharacters(characters)
        })

}

const displayCharacters = (characters) => {

    //Setup bootstrap card layout
    const cardRow = document.createElement('div')
    cardRow.classList.add('row', 'mt-2')

    characters.forEach(character => {
        fetch(character)
            .then(response => response.json())
            .then(character => {
                console.log(character)
                const cardCol = document.createElement('div')
                cardCol.classList.add('col-3')
                const cardLink = document.createElement('a')
                cardLink.href = "#"
                const card = document.createElement('div')
                card.classList.add('card')
                const image = document.createElement('img')
                const cardBody = document.createElement('div')
                cardBody.classList.add('card-body')
                const cardTitle = document.createElement('h5')
                cardTitle.classList.add('card-title')
                cardTitle.setAttribute('id', `${character.id}`)
                const cardText = document.createElement('p')
                cardText.classList.add('card-text', 'text-muted', 'fw-light', 'py-2')

                //populate card with character info
                image.src = character.image
                cardTitle.innerText = character.name
                cardText.innerText = `${character.status} | ${character.species}`

                //Append elements
                cardLink.appendChild(cardTitle)
                cardBody.appendChild(cardLink)
                cardBody.appendChild(cardText)

                card.appendChild(image)
                card.appendChild(cardBody)

                cardCol.appendChild(card)

                cardRow.appendChild(cardCol)

                //Add eventlistener to the card
                cardLink.addEventListener('click', (e) => {
                    const characterUrl = character.url
                    displayCharacter(characterUrl)
                })
            })
    })
    contentBodyDivCol.appendChild(cardRow)
}

const displayCharacter = (characterUrl) => {

    //clear the main div
    contentBodyDivCol.innerHTML = ""

    //fetch the charater data
    fetch(characterUrl)
        .then(getResponse)
        .then(character => {
            // Set up bootstrap card layout

            //card div
            const cardDiv = document.createElement('div')
            cardDiv.classList.add('card', 'mb-3')

            //card title div with image
            const cardTitleRow = document.createElement('div')
            cardTitleRow.classList.add('row', 'g-0', 'pb-2')
            const cardTitleImageCol = document.createElement('div')
            cardTitleImageCol.classList.add('col-4')
            const cardTitleImage = document.createElement('img')
            cardTitleImage.classList.add('img-fluid', 'p-3')

            //show character img
            cardTitleImage.src = character.image

            cardTitleImageCol.appendChild(cardTitleImage)

            const cardTitleInfoCol = document.createElement('div')
            cardTitleInfoCol.classList.add('col-8')
            const cardTitleInfoBody = document.createElement('div')
            cardTitleInfoBody.classList.add('card-body')
            const cardBodyTitle = document.createElement('h5')
            cardBodyTitle.classList.add('card-title')

            //show character name
            cardBodyTitle.innerText = character.name

            const cardBodyContent = document.createElement('p')
            cardBodyContent.classList.add('card-text', 'text-muted', 'fw-sm')

            //Add link to character origin
            const characterOriginLink = document.createElement('a')
            characterOriginLink.href = "#"
            characterOriginLink.classList.add('link-info')
            const cardBodyContentOrigin = document.createElement('p')
            cardBodyContentOrigin.classList.add('card-text', 'fw-normal', 'py-2')

            cardBodyContentOrigin.innerText = `Origin:${character.origin.name}`
            characterOriginLink.appendChild(cardBodyContentOrigin)
            //show character info
            cardBodyContent.innerText = `${character.status} | ${character.species} | ${character.gender}`

            cardTitleInfoBody.appendChild(cardBodyTitle)
            cardTitleInfoBody.appendChild(characterOriginLink)
            cardTitleInfoBody.appendChild(cardBodyContent)
            cardTitleInfoCol.appendChild(cardTitleInfoBody)

            cardTitleRow.appendChild(cardTitleImageCol)
            cardTitleRow.appendChild(cardTitleInfoCol)


            //card episode info row div
            const cardEpisodesRow = document.createElement('div')
            cardEpisodesRow.classList.add('row', 'mx-3', 'border-top', 'pt-3', 'text-center')

            cardDiv.appendChild(cardTitleRow)
            cardDiv.appendChild(cardEpisodesRow)

            contentBodyDivCol.appendChild(cardDiv)

            //Add EventListener to origin location
            characterOriginLink.addEventListener('click', (e) => {
                displayLocation(character.origin.url)

            })

            //Show character episodes
            character.episode.forEach(episode => {
                const episodeCol = document.createElement('div')
                episodeCol.classList.add('col-3', 'pt-3')
                const episodelink = document.createElement('a')
                episodelink.href = "#"
                const episodeName = document.createElement('h6')
                episodeName.setAttribute('url', episode)
                episodelink.appendChild(episodeName)
                const episodeNumber = document.createElement('div')
                fetch(episode)
                    .then(response => response.json())
                    .then(data => {
                        episodeName.innerText = data.name
                        episodeNumber.innerText = data.episode
                    })

                episodeCol.appendChild(episodelink)
                episodeCol.appendChild(episodeNumber)

                //add EventListener to each episode
                episodelink.addEventListener('click', (e) => {
                    const thisEpisodeUrl = e.target.getAttribute('url')
                    displayEpisode(thisEpisodeUrl)
                })

                cardEpisodesRow.appendChild(episodeCol)
            })
        })
}

const displayLocation = (originUrl) => {
    //clear the main div
    contentBodyDivCol.innerHTML = ""

    //fetch location data
    if (originUrl) {
        fetch(originUrl)
            .then(getResponse)
            .then(location => {
                //setup bootstrap layout
                const locationName = document.createElement('h5')
                locationName.classList.add('py-2')
                locationName.innerText = `${location.name} `
                const locationInfo = document.createElement('p')
                locationInfo.classList.add('text-muted', 'fw-light', 'py-2')
                locationInfo.innerText = `${location.type} | ${location.dimension}`
                contentBodyDivCol.appendChild(locationName)
                contentBodyDivCol.appendChild(locationInfo)
                displayCharacters(location.residents)
            })
    }
}


