const rootDiv = document.querySelector("#root");

//HEADER
const headerDiv = document.createElement("div");
headerDiv.classList.add("header");
const h1Header = document.createElement("h1");
h1Header.innerText = "Rick and Morty API";
const h2Header = document.createElement("h2");
h2Header.innerText = "by Amanda Maria";
headerDiv.appendChild(h1Header);
headerDiv.appendChild(h2Header);
rootDiv.appendChild(headerDiv);

//DIV BIGCONTAINER
const bigContainer = document.createElement("div");
bigContainer.classList.add("big-container");
rootDiv.appendChild(bigContainer);

//SIDEBAR
const sidebarDiv = document.createElement("div");
sidebarDiv.classList.add("sidebar");
bigContainer.appendChild(sidebarDiv);

const episode1 = document.createElement("h3");
episode1.innerText = "Episode 1";
const episode2 = document.createElement("h3");
episode2.innerText = "Episode 2";
const episode3 = document.createElement("h3");
episode3.innerText = "Episode 3";
const episode4 = document.createElement("h3");
episode4.innerText = "Episode 4";
const episode5 = document.createElement("h3");
episode5.innerText = "Episode 5";

sidebarDiv.appendChild(episode1);
sidebarDiv.appendChild(episode2);
sidebarDiv.appendChild(episode3);
sidebarDiv.appendChild(episode4);
sidebarDiv.appendChild(episode5);

//MAIN CONTAINER
const mainContainer = document.createElement("div");
mainContainer.classList.add("main-cointainer");
bigContainer.appendChild(mainContainer);


