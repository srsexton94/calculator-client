'use strict'

const store = require('../store')
const ui = require('./ui')
const eq = require('./eq')

const onNumber = event => {
  event.preventDefault() // prevents page refresh
  const digit = event.target.id // sets a var with the number selected
  const display = $('#display').text() // sets a var with current display text

  if (store.waiting) {
    store.waiting = false
    ui.displayNum('0', digit)
  } else {
    ui.displayNum(display, digit)
  }
}

const onDecimal = event => {
  event.preventDefault() // prevents page refresh
  const display = $('#display').text() // sets a var with current display text

  if (display.length >= 6) { // if number is too long flash to indicate reject
    ui.displayFlash(display)
  } else {
    $('#display').text(display + '.') // add decimal to display
  }

  if (store.waiting) {
    $('#display').text('0.')
    store.waiting = false
  }
}

const onOperator = event => {
  event.preventDefault()
  const op = event.target.id
  const display = $('#display').text()

  if ((display === '0' && (op === 'multiply' || op === 'divide')) || store.waiting) {
    ui.displayError()
  } else if (!store.op) {
    store.num1 = parseFloat(display)
    store.op = op
    store.waiting = true
  } else if (store.num1 && store.op && store.num2) {
    store.num1 = eq.equals()
    store.op = op
    $('#display').text(store.num1)
    store.waiting = true
  }
}

const onEquals = event => {
  event.preventDefault()
  const display = $('#display').text()

  if (store.waiting) {
    ui.displayError()
  } else if (store.num1 && store.op) {
    store.num2 = parseFloat(display)
    eq.equals()
  }
}

const onPosNeg = event => {
  event.preventDefault()
  const display = $('#display').text()

  if (store.waiting) {
    ui.displayError()
  } else if (display.charAt(0) === '-') {
    const pos = display.replace('-', '')
    $('#display').text(pos)
  } else {
    const neg = '-' + display
    $('#display').text(neg)
  }
}

const onPercent = event => {
  event.preventDefault()
  let display = $('#display').text()

  if (display.length === 1) {
    display = '0' + display
  } else if (display.length > 4) {
    display = display.substring(0, 4)
  }
  $('#display').text('0.' + display)
}

const onClear = event => {
  event.preventDefault()
  if (event.target.id === 'all-clear') {
    store.mem = 0
  }
  eq.clear()
}

const addHandlers = () => {
  $('.number').on('click', onNumber)
  $('#decimal').on('click', onDecimal)
  $('.op').on('click', onOperator)
  $('#equals').on('click', onEquals)
  $('#pos-neg').on('click', onPosNeg)
  $('#percent').on('click', onPercent)
  $('.clear').on('click', onClear)
}

module.exports = {
  addHandlers
}
