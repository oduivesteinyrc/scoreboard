const getPlayers = () => {
  let playersJSON = localStorage.getItem('players')
  try {
    return playersJSON ? JSON.parse(playersJSON) : []
  } catch (error) {
    return []
  }
}
const setPlayers = (players) => {
  localStorage.setItem('players', JSON.stringify(players))
}
const sortPlayers = players => {
  players.sort((a, b) => {
    if (a.score < b.score) return 1
    if (a.score > b.score) return -1
  })
}

const removeBdrStyles = borders => {
  for (let i = 0; i < borders.length; i++) {
    borders[i].style.border = 'none'
  }
}
const removeInputs = borders => {
  for (let i = 0; i < borders.length; i++) {
    borders[i].value = ''
  }
}


const addPlayer = (playersInfo, {
  firstName,
  lastName,
  company,
  score,
  uuid
}) => {
  playersInfo.innerHTML = ''
  let id = uuid.trim()
  let date = moment().format('MMM DD, YYYY HH:mm')
  score = Number(score)
  let playersJSON = getPlayers()
  playersJSON.push({
    id,
    firstName,
    lastName,
    company,
    score,
    date
  })
  sortPlayers(playersJSON)
  setPlayers(playersJSON)
  for (const player of playersJSON) {
    displayPlayers(playersInfo, player)
  }
}

const editPlayer = (playersInfo, id, action) => {
  playersInfo.innerHTML = ''
  let playersJSON = getPlayers()
  if (action == 'del') {
    playersJSON = playersJSON.filter(player => player.id != id)
  }
  if (action == 'plus') {
    playersJSON = playersJSON.map(player => {
      if (player.id == id) {
        player.score += 5
      }
      return player
    })
  }
  if (action == 'minus') {
    playersJSON = playersJSON.map(player => {
      if (player.id == id) {
        if (player.score <= 0) {
          player.score = 0
        } else {
          player.score += -5
        }

      }
      return player
    })
  }

  sortPlayers(playersJSON)
  setPlayers(playersJSON)
  for (const player of playersJSON) {
    displayPlayers(playersInfo, player)
  }
}

const createNameDiv = (playersGrid, firstName, lastName, date, id) => {
  playersGrid.className = 'players-grid'
  const playerDiv = document.createElement('div')
  playerDiv.className = 'player-name'
  const fullName = document.createElement('p')
  fullName.textContent = firstName + ' ' + lastName
  const dateInfo = document.createElement('p')
  dateInfo.textContent = date
  const uuidInfo = document.createElement('p')
  uuidInfo.textContent = id
  uuidInfo.className = 'player-uuid'
  playerDiv.appendChild(fullName)
  playerDiv.appendChild(dateInfo)
  playerDiv.appendChild(uuidInfo)
  playersGrid.appendChild(playerDiv)
}
const createCompanyDiv = (playersGrid, company) => {
  const companyDiv = document.createElement('div')
  companyDiv.textContent = company
  playersGrid.appendChild(companyDiv)
}
const createScoreDiv = (playersGrid, score) => {
  const scoreDiv = document.createElement('div')
  scoreDiv.textContent = score
  playersGrid.appendChild(scoreDiv)
}
const createEditDiv = (playersGrid, playersInfo, id) => {
  const editDiv = document.createElement('div')
  editDiv.className = 'player-edit'
  const delDiv = document.createElement('div')
  delDiv.innerHTML = '<i class="far fa-trash-alt"></i>'
  const plusDiv = document.createElement('div')
  plusDiv.textContent = '+5'
  const minusDiv = document.createElement('div')
  minusDiv.textContent = '-5'
  editDiv.appendChild(delDiv)
  editDiv.appendChild(plusDiv)
  editDiv.appendChild(minusDiv)
  playersGrid.appendChild(editDiv)
  delDiv.addEventListener('click', e => {
    editPlayer(playersInfo, id, 'del')
  })
  plusDiv.addEventListener('click', e => {
    editPlayer(playersInfo, id, 'plus')
  })
  minusDiv.addEventListener('click', e => {
    editPlayer(playersInfo, id, 'minus')
  })
}

const displayPlayers = (playersInfo, {
  id,
  firstName,
  lastName,
  company,
  score,
  date
}) => {
  const playersGrid = document.createElement('div')
  createNameDiv(playersGrid, firstName, lastName, date, id)
  createCompanyDiv(playersGrid, company)
  createScoreDiv(playersGrid, score)
  createEditDiv(playersGrid, playersInfo, id)
  playersInfo.appendChild(playersGrid)
}