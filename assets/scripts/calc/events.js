'use strict'

const store = require('../store')
const ui = require('./ui')
const eq = require('./eq')

const onNumber = event => {
  event.preventDefault() // prevents page refresh

  const digit = event.target.id // the number selected
  const display = $('#display').text() // a string of what is currently on display

  // if the calculator is waiting for a new number...
  if (store.finished || store.waiting) {
    // tell it is no longer waiting for a new number
    store.finished = false
    store.waiting = false
    // and set the screen as if it was blank(`0`) before
    ui.displayNum('0', digit)
  } else {
    // otherwise, display the new digit (replaces the starting zero)
    ui.displayNum(display, digit)
  }

  // if the user does "the thing"...
  if ($('#display').text() === '0.7734') {
    ui.easterEgg() // display easter egg action!
  }
}

const onDecimal = event => {
  event.preventDefault() // prevents page refresh

  const display = $('#display').text() // sets a var with current display text

  // if number is too long, or already has a decimal, flash to indicate reject
  if (display.length >= 6 || display.includes('.')) {
    ui.displayFlash(display)
  } else {
    $('#display').text(display + '.') // otherwise, add decimal to display
  }

  // if the calculator expects a new number entry, add a `0` before the decimal
  if (store.waiting || store.finished) {
    $('#display').text('0.')
    // also tell the calculator to no longer expect a new number entry
    store.waiting = false
    store.finished = false
  }
}

const onOperator = event => {
  event.preventDefault() // prevents page refresh

  const op = event.target.id // a string of which operator was selected
  const display = $('#display').text() // string of what is on calculator display

  // if the display has only a zero & wants to multiply or divide,
  // OR if the calculator was expecting a number (ie an operator was *just* entered)...
  if ((display === '0' && (op === 'multiply' || op === 'divide')) || store.waiting) {
    ui.displayError(display) // ... then flash an error message
  // otherwise, if there is not yet an operator, set the one selected
  // AND set the current display as the first number
  } else if (!store.op) {
    eq.setOperator(parseFloat(display), op)
  // if the calculator could have received
  } else if (store.num1 && store.op) {
    const newNum1 = eq.equals()
    eq.setOperator(newNum1, op)
    $('#display').text(newNum1)
  }
}

const onEquals = event => {
  event.preventDefault() // prevents page refresh

  const display = $('#display').text() // string of display text

  if (store.waiting) { // if calculator is expecting second operand, display error
    ui.displayError(display)
  // otherwise the display text becomes the second operand...
  } else if (store.num1 && store.op) {
    store.num2 = parseFloat(display)
    eq.equals() // and the calculation is displayed & store is reset
  // otherwise the "answer" is just what's on display, which is stored in mem
  } else {
    store.mem = parseFloat(display)
  }
  // tell the calculator we just finised an operation
  store.finished = true
}

const onPosNeg = event => {
  event.preventDefault() // prevents page refresh
  let num = parseFloat($('#display').text()) // number (float) of display text

  // if the calculator was expecting the second operand, display error
  if (store.waiting) {
    ui.displayError(num)
  // otherwise, reset num as positive if negative, and vice versa
  } else if (num < 0) {
    num = Math.abs(num)
  } else if (num > 0) {
    num = -Math.abs(num)
  }
  $('#display').text(num) // display the reset num
}

const onPercent = event => {
  event.preventDefault() // prevents page refresh
  const display = $('#display').text() // string of display text

  let percent = (parseFloat(display) / 100).toString() // divides the number-ified display text by 100
  if (percent.length >= 6) {
    percent = eq.toXPlaces(percent, 6)
  }
  $('#display').text(percent)
}

const onClear = event => {
  event.preventDefault()
  if (event.target.id === 'all-clear') {
    store.mem = 0
  }
  eq.clear()
}

const onMemory = event => {
  event.preventDefault()

  if (store.mem === 0) {
    const display = $('#display').text()
    $('#display').text('NO MEM')
    setTimeout(() => { $('#display').text(display) }, 750)
    return
  }

  const mem = store.mem
  switch (event.target.id) {
    case 'memory-recall':
      if (store.waiting) { store.waiting = false }
      $('#display').text(store.mem)
      break
    case 'memory-clear':
      store.mem = 0
      break
    case 'memory-plus':
      store.num1 = parseFloat($('#display').text())
      store.op = 'add'
      store.num2 = mem
      eq.equals()
      store.mem = mem
      break
    case 'memory-minus':
      store.num1 = parseFloat($('#display').text())
      store.op = 'subtract'
      store.num2 = mem
      eq.equals()
      store.mem = mem
      break
  }
}

const offOn = event => {
  event.preventDefault()

  if (event.target.id === 'on') {
    $('#display').css('background-color', 'white')
    $('.btn').removeClass('disable')
    eq.clear()
  } else {
    $('#display').text('').css('background-color', 'grey')
    $('.btn').addClass('disable')
    $('#on').removeClass('disable')
  }
}

const addHandlers = () => {
  $('.number').on('click', onNumber)
  $('#decimal').on('click', onDecimal)
  $('.op').on('click', onOperator)
  $('#equals').on('click', onEquals)
  $('#pos-neg').on('click', onPosNeg)
  $('#percent').on('click', onPercent)
  $('.clear').on('click', onClear)
  $('.memory').on('click', onMemory)
  $('.power').on('click', offOn)
}

module.exports = {
  addHandlers
}
