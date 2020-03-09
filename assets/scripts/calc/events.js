'use strict'

const store = require('../store')
const ui = require('./ui')
const eq = require('./eq')

const onNumber = event => {
  event.preventDefault() // prevents page refresh
  const digit = event.target.id // sets a var with the number selected
  const display = $('#display').text() // sets a var with current display text

  if (store.finished) {
    $('#display').text(digit)
    store.finished = false
  } else if (store.waiting) {
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

  if (store.waiting || store.finished) {
    $('#display').text('0.')
    store.waiting = false
    store.finished = false
  }
}

const onOperator = event => {
  event.preventDefault()
  const op = event.target.id
  const display = $('#display').text()

  if ((display === '0' && (op === 'multiply' || op === 'divide')) || store.waiting) {
    ui.displayError(display)
  } else if (!store.op) {
    eq.setOperator(parseFloat(display), op)
  } else if (store.num1 && store.op && store.num2) {
    const newNum1 = eq.equals()
    eq.setOperator(newNum1, op)
    $('#display').text(newNum1)
  }
}

const onEquals = event => {
  event.preventDefault()
  const display = $('#display').text()

  if (store.waiting) {
    ui.displayError(display)
  } else if (store.num1 && store.op) {
    store.num2 = parseFloat(display)
    eq.equals()
  } else {
    store.mem = parseFloat(display)
  }
  store.finished = true
}

const onPosNeg = event => {
  event.preventDefault()
  let num = parseFloat($('#display').text())

  if (store.waiting) {
    ui.displayError(num)
  } else if (num < 0) {
    num = Math.abs(num)
  } else if (num > 0) {
    num = -Math.abs(num)
  }
  $('#display').text(num)
}

const onPercent = event => {
  event.preventDefault()
  const display = $('#display').text()

  let percent = parseFloat(display) / 100
  if (percent.length >= 6) {
    // how to get fit the screen?
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
