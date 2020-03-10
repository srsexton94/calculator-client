'use strict'

const displayError = (display) => {
  $('#display').text('ERROR')
  setTimeout(() => { $('#display').text(display) }, 750)
}

const displayFlash = display => {
  $('#display').text('')
  setTimeout(() => { $('#display').text(display) }, 100)
}

const displayNum = (display, num) => {
  if (display.length >= 6) { // if number is too long flash to indicate reject
    displayFlash(display)
  } else if (display !== '0') { // if the display has anything other than a single 0
    $('#display').text(display + num) // ...add another digit
  } else { // if the display is a single zero
    $('#display').text(num) // ...replace the zero
  }
}

const easterEgg = () => {
  console.log('Easter Egg coming soon to a bunny near you!')
}

module.exports = {
  displayError,
  displayFlash,
  displayNum,
  easterEgg
}
