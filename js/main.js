const playersInfo = document.querySelector('.players-info')
const addButton = document.querySelector('.btn')
const userFirstName = document.querySelector('.first-name')
const userLastName = document.querySelector('.last-name')
const userCompany = document.querySelector('.company')
const userScore = document.querySelector('.player-score')
const userUuid = document.querySelector('.uuid')
const errorMsg = document.querySelector('.error-msg')
const borders = document.querySelectorAll('.bdr')

const playersJSON = getPlayers()
playersInfo.innerHTML = ''
sortPlayers(playersJSON)
for (const player of playersJSON) {
  displayPlayers(playersInfo, player)
}



addButton.addEventListener('click', e => {
  e.preventDefault()
  let firstName = userFirstName.value.trim()
  let lastName = userLastName.value.trim()
  let company = userCompany.value.trim()
  let score = userScore.value.trim()
  let uuid = userUuid.value.trim()
  let obj = {
    firstName,
    lastName,
    company,
    score,
    uuid
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
    errorMsg.style.display = 'block'
    removeBdrStyles(borders)
    errorMsg.textContent = msg
    let elements = document.getElementsByClassName(field)
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.border = '1px solid red'
    }
  }

})