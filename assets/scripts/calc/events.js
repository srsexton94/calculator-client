'use strict'
let equation = []

const onNumber = event => {
  event.preventDefault() // prevents page refresh
  const numStr = event.target.id // sets a var with the number selected
  const displayStr = $('#display').text() // sets a var with current display text

  if (displayStr !== '0') { // if the display has anything other than a single 0
    $('#display').text(displayStr + numStr) // ...add another digit
  } else { // if the display is a single zero
    $('#display').text(numStr) // ...replace the zero
  }
}

const addHandlers = () => {
  $('.number').on('click', onNumber)
}

module.exports = {
  addHandlers
}
