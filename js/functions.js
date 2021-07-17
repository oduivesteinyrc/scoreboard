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
  country,
  score
}) => {
  playersInfo.innerHTML = ''
  let id = generateId()
  let date = getDate()
  score = Number(score)
  let playersJSON = JSON.parse(localStorage.getItem('players'))
  playersJSON.push({
    id,
    firstName,
    lastName,
    country,
    score,
    date
  })
  sortPlayers(playersJSON)
  localStorage.setItem('players', JSON.stringify(playersJSON))
  for (const player of playersJSON) {
    displayPlayers(playersInfo, player)
  }
}

const editPlayer = (playersInfo, id, action) => {
  playersInfo.innerHTML = ''
  let playersJSON = JSON.parse(localStorage.getItem('players'))
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
        player.score += -5
      }
      return player
    })
  }

  sortPlayers(playersJSON)
  localStorage.setItem('players', JSON.stringify(playersJSON))
  for (const player of playersJSON) {
    displayPlayers(playersInfo, player)
  }
}

const createNameDiv = (playersGrid, firstName, lastName, date) => {
  playersGrid.className = 'players-grid'
  const playerDiv = document.createElement('div')
  playerDiv.className = 'player-name'
  const fullName = document.createElement('p')
  fullName.textContent = firstName + ' ' + lastName
  const dateInfo = document.createElement('p')
  dateInfo.textContent = date
  playerDiv.appendChild(fullName)
  playerDiv.appendChild(dateInfo)
  playersGrid.appendChild(playerDiv)
}
const createCountryDiv = (playersGrid, country) => {
  const countryDiv = document.createElement('div')
  countryDiv.textContent = country
  playersGrid.appendChild(countryDiv)
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
  country,
  score,
  date
}) => {
  const playersGrid = document.createElement('div')
  createNameDiv(playersGrid, firstName, lastName, date)
  createCountryDiv(playersGrid, country)
  createScoreDiv(playersGrid, score)
  createEditDiv(playersGrid, playersInfo, id)
  playersInfo.appendChild(playersGrid)
}