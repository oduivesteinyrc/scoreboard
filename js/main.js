const playersInfo = document.querySelector('.players-info')
const addButton = document.querySelector('.btn')
const userFirstName = document.querySelector('.first-name')
const userLastName = document.querySelector('.last-name')
const userCountry = document.querySelector('.country')
const userScore = document.querySelector('.player-score')
const errorMsg = document.querySelector('.error-msg')
const borders = document.querySelectorAll('.bdr')

const playersJSON = JSON.parse(localStorage.getItem('players'))
playersInfo.innerHTML = ''
if (!playersJSON) {
  localStorage.setItem('players', JSON.stringify(players))
  sortPlayers(players)
  for (const player of players) {
    displayPlayers(playersInfo, player)
  }

} else {
  sortPlayers(playersJSON)
  for (const player of playersJSON) {
    displayPlayers(playersInfo, player)
  }
}


addButton.addEventListener('click', e => {
  e.preventDefault()
  let firstName = userFirstName.value.trim()
  let lastName = userLastName.value.trim()
  let country = userCountry.value.trim()
  let score = userScore.value.trim()
  let obj = {
    firstName,
    lastName,
    country,
    score
  }
  let valid = validatePlayer(obj)
  let {
    isValid,
    msg,
    field
  } = valid
  if (isValid) {
    errorMsg.style.display = 'none'
    removeBdrStyles(borders)
    addPlayer(playersInfo, obj)
    removeInputs(borders)
  } else {
    removeBdrStyles(borders)
    errorMsg.textContent = msg
    let elements = document.getElementsByClassName(field)
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.border = '1px solid red'
    }
  }

})