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
contentBodyDivCol.classList.add('col-9')
const contentSidebarDivCol = document.createElement('div')
contentSidebarDivCol.classList.add('col-3')
contentDivRow.appendChild(contentBodyDivCol)
rootDiv.appendChild(contentDivRow)

// 1.1 Project tile
const projectTitle = document.createElement('h1')
projectTitle.innerText = "Rick and Morty"

titleDiveCol.appendChild(projectTitle)


const createNextBtn = () => {
    contentDivRow.appendChild(contentSidebarDivCol)
    //1.2.x Sidebar button
    const nextPageBtn = document.createElement('button')
    nextPageBtn.setAttribute('id', 'next-page-btn')
    nextPageBtn.classList.add('btn-primary', 'btn')
    nextPageBtn.innerText = "Next"
    setTimeout(() => { contentSidebarDivCol.appendChild(nextPageBtn) }, 0.5 * 1000)
}
createNextBtn()


//1.2 Sidebar
let page = 1

const fetchEpisodesData = (page) => {
    fetch(`${episodesUrl}?page=${page}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.results)
            let episodes = data.results
            displayEpisodes(episodes)
        })
}


const displayEpisodes = (episodes) => {
    console.log(episodes)
    //create html list elements
    const episodesUl = document.createElement('ul')
    episodesUl.classList.add('list-group')

    episodes.forEach(episode => {
        const episodeLi = document.createElement('li')
        episodeLi.classList.add('list-group-item')
        episodeLi.innerText = `Episode: ${episode.episode}:${episode.name}`
        episodesUl.appendChild(episodeLi)

    })
    contentSidebarDivCol.appendChild(episodesUl)
}


fetchEpisodesData(1)


const cleanList = () => {
    contentSidebarDivCol.innerHTML = ''
}
const waitOneSecond = (doSomething) => {
    setTimeout(doSomething, 1 * 1000)
}
const setUpNextPageBtn = () => {
    const nextPageBtn = document.querySelector('#next-page-btn')
    console.log('nextpage!')
    console.log(nextPageBtn)
    nextPageBtn.addEventListener('click', () => {
        console.log('nextpage!')
        page = page + 1
        cleanList()
        createNextBtn()
        fetchEpisodesData(page)

    })
}
waitOneSecond(setUpNextPageBtn)



// fetch(characterUrl)
//     .then(response => response.json())
//     .then(data => console.log(data))


