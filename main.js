/*Declaration of variables*/ 
const firstNameInput = document.querySelector('.first-name')
const lastNameInput = document.querySelector('.last-name')
const countryInput = document.querySelector('.country')
const scoreInput = document.querySelector('.player-score')
const addPlayerButton = document.querySelector('.add-player')
const resultsDiv = document.querySelector('.results-conatiner')
const errorDiv = document.querySelector('.error')
/*Setting flag to check whether +5 or -5 is clicked*/ 
let addFlag = 0
let minusFlag = 0

/*Creating the player object to be displayed*/
let players = [{
    firstName: 'Mangalam',
    lastName: 'Krishnan',
    country: 'India',
    score:   60,
    time: 'February 4, 2020 13:20:42'
},
{

    firstName: 'Sharanya',
    lastName: 'Sanjay',
    country: 'Finland',
    score: 50,
    time: 'February 3, 2020 14:20:42'
},
{

    firstName: 'Sanjay',
    lastName: 'Jayaraman',
    country: 'Belgium',
    score: 40,
    time: 'February 2, 2020 15:20:42'


}]

/*Function to sort the players by the score*/ 
const sortByScore = (players) => {
    players.sort((a,b) => {
        if(a.score < b.score) return 1
        if(a.score > b.score) return -1
        return 0
    })
    return players
}

/*Function to display the player name and the time when the player is added*/ 
const createNameDiv = (playerDiv,firstName,lastName,time) => {
const nameDiv = document.createElement('div')
nameDiv.setAttribute('class','name-div')
const fullNameDiv = document.createElement('div')
fullNameDiv.setAttribute('class','full-name-div')
fullNameDiv.textContent = (firstName + ' ' + lastName).toUpperCase()
const timeDiv = document.createElement('div')
timeDiv.setAttribute('class','time-div')
timeDiv.textContent = time
nameDiv.appendChild(fullNameDiv)
nameDiv.appendChild(timeDiv)
playerDiv.appendChild(nameDiv)
}

/*Function to display the country of the player*/ 
const createCountryDiv = (playerDiv,country) => {
    const countryDiv = document.createElement('div')
countryDiv.setAttribute('class','country-div')
countryDiv.textContent = country
playerDiv.appendChild(countryDiv)
}

/*Function to display the score of the player*/
const createScoreDiv = (playerDiv,score) => {
const scoreDiv = document.createElement('div')
scoreDiv.setAttribute('class','score-div')
scoreDiv.textContent = score
playerDiv.appendChild(scoreDiv)

}

/*Function to delete the player*/ 
const deletePlayer = (firstName,lastName,country,score) => {
    const playersFromJson = JSON.parse(localStorage.getItem('players'))
    const tempArray = []
    for(player of playersFromJson) {
        if (!(player.firstName == firstName && player.lastName == lastName )) {
            tempArray.push(player)

        }
    }
    const delPlayer =sortByScore(tempArray)
    localStorage.setItem('players',JSON.stringify(delPlayer))
    addPlayer(JSON.parse(localStorage.getItem('players')))
}

/*Function to add or minus the scores*/ 
const addOrMinusScore = (firstName,lastName,score) => {
    const playersFromJson = JSON.parse(localStorage.getItem('players'))
    console.log(playersFromJson)
    for(player of playersFromJson) {
        if(player.firstName == firstName && player.lastName == lastName) {
            if(addFlag == 1) {
                console.log('I am inside add')
                player.score = parseInt(score) + 5
            }
            if(minusFlag == 1) {
                console.log('I am inside minus')
                player.score = parseInt(score) - 5
            }
        }
    }
    console.log(playersFromJson)
    const sortedArray = sortByScore(playersFromJson)
    console.log(sortedArray)
    localStorage.setItem('players',JSON.stringify(sortedArray))
    console.log(JSON.parse(localStorage.getItem('players')))
    addPlayer(JSON.parse(localStorage.getItem('players')))
}
/*Function to add the delete, plus and minus buttons*/ 
const createDelAddDiv = (playerDiv,firstName,lastName,country,score) => {
    const delAddDiv = document.createElement('div')
delAddDiv.setAttribute('class','del-add-div')
const delButton = document.createElement('button')
delButton.setAttribute('class','del-button')
delButton.innerHTML = '<i class="fas fa-trash-alt"></i>'
//delButton.textContent = 'Del'
const plusButton = document. createElement('button')
plusButton.setAttribute('class','plus-button')
plusButton.textContent = '+5'
const minusButton = document.createElement('button')
minusButton.setAttribute('class','minus-button')
minusButton.textContent = '-5'
delAddDiv.appendChild(delButton)
delAddDiv.appendChild(plusButton)
delAddDiv.appendChild(minusButton)
playerDiv.appendChild(delAddDiv)
delButton.addEventListener('click',event => {
    playerDiv.textContent = ''
    deletePlayer(firstName,lastName,country,score)
})
plusButton.addEventListener('click',event => {
    addFlag =1
    minusFlag = 0
    playerDiv.textContent = ''
    addOrMinusScore(firstName,lastName,score)

})
minusButton.addEventListener('click',event => {
    minusFlag = 1
    addFlag = 0
    playerDiv.textContent = ''
    addOrMinusScore(firstName,lastName,score)
})
}

/*Function to add the player*/ 
const addPlayer = (sortedPlayers) => {
    resultsDiv.textContent = ''
    for(const player of sortedPlayers) {
    let{firstName,lastName,country,score,time} = player
const playerDiv = document.createElement('div')
playerDiv.setAttribute('class','player-div')
resultsDiv.appendChild(playerDiv)
createNameDiv(playerDiv,firstName,lastName,time)
createCountryDiv(playerDiv,country)
createScoreDiv(playerDiv,score)
createDelAddDiv(playerDiv,firstName,lastName,country,score)

    }
}

/*Function to give stylings to error message*/
const errorStyles = (errorMessage) => {

    errorDiv.textContent = ''
    errorDiv.style.display = 'block'
    errorDiv.style.color = 'red'
    errorDiv.textContent = errorMessage

}
/*Function to check whether the player exist or not*/ 
const playerDuplicate = (firstNameValue,lastNameValue) => {
    const playersFromJson = JSON.parse(localStorage.getItem('players'))
    for (const player of playersFromJson) {
        if((player.firstName == firstNameValue) && (player.lastName == lastNameValue)) {
            return true
        }
    }
    return false
}

/*Validation function to check whether the input is correct or not*/ 
const validateInputs = () => {
    let pattern1 = /^[A-Z]+$/ig
    let pattern2 = /^[0-9]+$/
    let firstNameValue = firstNameInput.value
    let lastNameValue = lastNameInput.value
    let countryValue = countryInput.value
    let scoreValue = scoreInput.value
    if(firstNameValue.length ==0 || lastNameValue.length ==0 || countryValue.length==0 || scoreValue.length==0) {
        let errorMessage = 'All fields are required'
        errorStyles(errorMessage)
    }
    else if (!(firstNameValue.match(pattern1)) || !(lastNameValue.match(pattern1)) || !(countryValue.match(pattern1))){
        let errorMessage = 'Please enter only alphabets'
        errorStyles(errorMessage)
    }
    else if(!(scoreValue.match(pattern2))) {
        let errorMessage = 'Please enter only digits'
        errorStyles(errorMessage)
    }
    else if(playerDuplicate(firstNameValue,lastNameValue)) {
        let errorMessage = 'Player already exists'
        errorStyles(errorMessage)
    }
    else {
        const playersFromJson = JSON.parse(localStorage.getItem('players'))
        let time = dateToday()
        errorDiv.textContent = ''
        playersFromJson.push({
            firstName:firstNameValue,
            lastName: lastNameValue,
            country: countryValue,
            score: scoreValue,
            time: time
        })
        const sortedPlayers = sortByScore(playersFromJson)
        localStorage.setItem('players',JSON.stringify(sortedPlayers))
        console.log(JSON.parse(localStorage.getItem('players')))
        addPlayer(JSON.parse(localStorage.getItem('players')))
        location.reload()
        //FormData.reload()
    }
}

/*Event listener to add players*/ 
addPlayerButton.addEventListener('click', event => {
    validateInputs()  
})

/*Home page to display the default players*/ 
//localStorage.setItem('players',JSON.stringify(players))
const getPlayers = JSON.parse(localStorage.getItem('players'))
if(!getPlayers) {
    localStorage.setItem('players',JSON.stringify(players))
    const sortedPlayers = sortByScore(players)
    addPlayer(sortedPlayers)
}
else {
    const sortedPlayers = sortByScore(getPlayers)
    addPlayer(sortedPlayers)
}







