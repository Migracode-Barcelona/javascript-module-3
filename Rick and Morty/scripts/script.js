url = 'https://rickandmortyapi.com/api'
characterUrl = 'https://rickandmortyapi.com/api/character'
episodesUrl = "https://rickandmortyapi.com/api/episode"
locationsUrl = "https://rickandmortyapi.com/api/location"



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
contentSidebarDivCol.classList.add('col-4', 'position-relative')

const contentBodyDivCol = document.createElement('div')
contentBodyDivCol.classList.add('col-8')

contentDivRow.appendChild(contentSidebarDivCol)
contentDivRow.appendChild(contentBodyDivCol)
rootDiv.appendChild(contentDivRow)

// 1.1 Project tile
const projectTitle = document.createElement('h1')
projectTitle.innerText = "Rick and Morty"

titleDiveCol.appendChild(projectTitle)


const createShowMoreBtn = () => {
    contentDivRow.appendChild(contentSidebarDivCol)
    //1.2.x Sidebar button
    const showMorePageBtn = document.createElement('button')
    showMorePageBtn.setAttribute('id', 'show-more-page-btn')
    showMorePageBtn.classList.add('btn-dark', 'btn', 'mt-3', 'position-absolute', 'bottom-0', 'end-0')
    showMorePageBtn.innerText = "Load Episodes"
    setTimeout(() => { contentSidebarDivCol.appendChild(showMorePageBtn) }, 0.5 * 1000)
}
createShowMoreBtn()


//1.2 Sidebar
let page = 1

const fetchEpisodesData = (page) => {
    if (page <= 3) {
        fetch(`${episodesUrl}?page=${page}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.results)
                let episodes = data.results
                displayEpisodes(episodes)
            })
    }

}


const displayEpisodes = (episodes) => {
    //create html list elements
    const episodesUl = document.createElement('ul')
    episodesUl.classList.add('list-group')

    episodes.forEach(episode => {
        const episodeLi = document.createElement('li')
        episodeLi.classList.add('list-group-item', 'episode-item')
        const episodeLiLink = document.createElement('a')
        episodeLiLink.classList.add('link-dark')
        episodeLiLink.innerText = `Episode: ${episode.episode}:${episode.name}`
        episodeLiLink.setAttribute('id', `episode-${episode.id}`)
        episodeLiLink.setAttribute('url', `${episode.url}`)

        episodeLiLink.setAttribute('href', '#')
        episodeLi.appendChild(episodeLiLink)
        episodesUl.appendChild(episodeLi)
        //add eventlistner to each list item
        episodeLiLink.addEventListener('click', (e) => {
            let episodeUrl = e.target.getAttribute('url')

            console.log(episodeUrl)
            getEpisode(episodeUrl)
        })
    })
    contentSidebarDivCol.appendChild(episodesUl)

}

const getEpisode = (episodeUrl) => {
    fetch(episodeUrl)
        .then(response => response.json())
        .then(episode => {
            showEpisode(episode)
        })

}

const showEpisode = (episode) => {
    const episodeInfo = document.createElement('h5')
    episodeInfo.classList.add('py-2')
    episodeInfo.innerText = `${episode.name} `
    const episodeInfoBody = document.createElement('p')
    episodeInfoBody.classList.add('text-muted', 'fw-light', 'py-2')
    episodeInfoBody.innerText = `${episode.air_date} | ${episode.episode}`
    contentBodyDivCol.appendChild(episodeInfo)
    contentBodyDivCol.appendChild(episodeInfoBody)
    let characters = episode.characters
    getCharacters(characters)
}

const getCharacters = (characters) => {
    characters.forEach(character => {
        fetch(character)
            .then(response => response.json())
            .then(character => showCharacter(character))
    })
}

const showCharacter = (character) => {
    console.log(character.episode)
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

    //show character info
    cardBodyContent.innerText = `${character.status} | ${character.species} | ${character.gender} | ${character.origin.name}`

    cardTitleInfoBody.appendChild(cardBodyTitle)
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
    console.log(character)

    //Show character episodes
    character.episode.forEach(episode => {
        const episodeCol = document.createElement('div')
        episodeCol.classList.add('col-3', 'pt-3')
        const episodeName = document.createElement('h6')
        const episodeNumber = document.createElement('div')
        fetch(episode)
            .then(response => response.json())
            .then(data => {
                episodeName.innerText = data.name
                episodeNumber.innerText = data.episode
            })
        episodeCol.appendChild(episodeName)
        episodeCol.appendChild(episodeNumber)

        cardEpisodesRow.appendChild(episodeCol)
    })
}




//load the first page 
fetchEpisodesData(1)


const cleanList = () => {
    contentSidebarDivCol.innerHTML = ''
}

const waitOneSecond = (doSomething) => {
    setTimeout(doSomething, 1 * 1000)
}

const setUpShowMorePageBtn = () => {
    const showMorePageBtn = document.querySelector('#show-more-page-btn')
    console.log('show morepage!')
    showMorePageBtn.addEventListener('click', () => {
        console.log('show more page!')
        page = page + 1
        console.log(page)

        if (page <= 3) {
            waitOneSecond(setUpShowMorePageBtn)
            // cleanList()
            fetchEpisodesData(page)
        }
    })
}

waitOneSecond(setUpShowMorePageBtn)


