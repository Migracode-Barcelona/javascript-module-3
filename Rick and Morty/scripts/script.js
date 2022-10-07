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
const contentBodyDivCol = document.createElement('div')
contentBodyDivCol.classList.add('col-8')
const contentSidebarDivCol = document.createElement('div')
contentSidebarDivCol.classList.add('col-4')
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
    showMorePageBtn.classList.add('btn-primary', 'btn', 'mt-3')
    showMorePageBtn.innerText = "Show More"
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
    const episodeInfo = document.createElement('h6')
    episodeInfo.innerText = `Name:${episode.name} Airdate:${episode.air_date} Episode:${episode.episode}`
    contentBodyDivCol.appendChild(episodeInfo)
    console.log(episode)
    let characters = episode.characters
    console.log(characters)
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
    console.log(character)

}
//attach eventlistener to each li item

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


