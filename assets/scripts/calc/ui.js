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
  const greeting = 'hello!'
  const rainbow = ['#FF0000', '#FF7F00', '#FFFF00', '#008000', '#0000FF', '#800080']
  let result = ''
  for (let i = 0; i < greeting.length; i++) {
    const color = rainbow[i]
    result += `<font style='color: ${color}'>${greeting.substr(i, 1)}</font>`
  }
  $('#display').html(result).css('background-color', 'black')
  setTimeout(() => { $('#display').text('0.7734').css('background-color', 'white') }, 2500)
}

module.exports = {
  displayError,
  displayFlash,
  displayNum,
  easterEgg
}
