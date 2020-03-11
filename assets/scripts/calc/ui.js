'use strict'

// display an error message, but reset screen in 3/4 second
const displayError = (display) => {
  $('#display').text('ERROR')
  setTimeout(() => { $('#display').text(display) }, 750)
}

// display a quick "flash" (ie remove & replace text in 1/10 second)
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
  const greeting = 'hello!'
  const rainbow = ['#FF0000', '#FF7F00', '#FFFF00', '#008000', '#0000FF', '#800080']
  let result = ''
  // for each char of 'hello!', concat the html for a different color of the rainbow...
  for (let i = 0; i < greeting.length; i++) {
    const color = rainbow[i]
    result += `<font style='color: ${color}'>${greeting.substr(i, 1)}</font>`
  }
  // add that concatenated html string to the display element, and turn the background black
  $('#display').html(result).css('background-color', 'black')
  // after 2.5 seconds, set everything back
  setTimeout(() => { $('#display').text('0.7734').css('background-color', 'white') }, 2500)
}

const solarPower = event => {
  event.preventDefault() // prevents page refresh

  $('#solar').css('background-color', '#b21a1f') // brightens solar panel as if charging
  setTimeout(() => { $('#solar').css('background-color', '#660f12') }, 3000) // resets solar panel to default
}

const solarDone = event => {
  event.preventDefault() // prevents page refresh

  $('#solar').css('background-color', '#660f12') // resets solar panel to default
}

module.exports = {
  displayError,
  displayFlash,
  displayNum,
  easterEgg,
  solarPower,
  solarDone
}
