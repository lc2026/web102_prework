/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    
    for (let index = 0; index < games.length; index++) {
        const game = games[index];


    

        // create a new div element, which will become the game card

        const game_card = document.createElement('div');

        // add the class game-card to the list

        game_card.classList.add("game-card");


        // set the inner HTML using a template literal to display some info
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        
        game_card.innerHTML = `
            <img class="game-img" src="${game.img}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Goal: ${game.goal}</p>
            <p>Backers: ${game.backers}</p>
        `;
    
    

        // append the game to the games-container

        gamesContainer.appendChild(game_card);

    }

    return games;
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

addGamesToPage(GAMES_JSON);
/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalContributions = GAMES_JSON.reduce ( (acc, contributionsCard) => {
    return acc + contributionsCard.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString('en-us')}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// Calculate the total amount pledged
const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);

// set inner HTML using template literal with a dollar sign and toLocaleString
raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-us')}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGameslist = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGameslist);

    // Log the number of unfunded games to the console
console.log("Number of unfunded games:", unfundedGameslist.length);
}



// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal

    const fundedGameslist = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGameslist);

    // Log the number of funded games to the console
    console.log("Number of funded games:", fundedGameslist.length);
}



// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM

    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const numberOfUnfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
}).length;

// To see the number of unfunded games

console.log("Number of unfunded games:", numberOfUnfundedGames);

// create a string that explains the number of unfunded games using the ternary operator

const totalGames = GAMES_JSON.length;
const companyDescription = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${totalGames} game${totalGames === 1 ? '' : 's'}. Currently, ${numberOfUnfundedGames} game${numberOfUnfundedGames === 1 ? ' is' : 's are'} unfunded. We need your help to fund these amazing games!`;

// To see the generated string

console.log(companyDescription); // To see the generated string

// create a new DOM element containing the template string and append it to the description container

// create a new paragraph element
const descriptionParagraph = document.createElement('p');

// set the inner HTML of the paragraph to the company description
descriptionParagraph.innerHTML = companyDescription;

// append the paragraph to the description container
descriptionContainer.appendChild(descriptionParagraph);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, runnerUp] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameNameElement = document.createElement('p'); // Or use <h3> or other element
topGameNameElement.textContent = topGame.name;
firstGameContainer.appendChild(topGameNameElement);

// do the same for the runner up item
const runnerUpNameElement = document.createElement('p');  // Or use <h3>
runnerUpNameElement.textContent = runnerUp.name;
secondGameContainer.appendChild(runnerUpNameElement);

// =========================
// OPTIONAL FEATURE: Search Bar
// =========================
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

function searchGames() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredGames = GAMES_JSON.filter((game) =>
        game.name.toLowerCase().includes(searchTerm) ||
        game.description.toLowerCase().includes(searchTerm)
    );
    deleteChildElements(gamesContainer);
    addGamesToPage(filteredGames);
}

// Add event listeners for the search functionality
if (searchButton && searchInput) {
    searchButton.addEventListener('click', searchGames);
    searchInput.addEventListener('input', searchGames); // Optional: Live search on input
}

