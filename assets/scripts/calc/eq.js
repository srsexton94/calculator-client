'use strict'

let store = require('../store')

const setOperator = (num1, op) => {
  store.num1 = num1
  store.op = op
  store.waiting = true
}

const clear = () => {
  store.num1 = 0
  store.op = null
  store.num2 = 0
  store.waiting = false
  $('#display').text('0')
}

const divide = () => {
  return store.num1 / store.num2
}

const multiply = () => {
  return store.num1 * store.num2
}

const subtract = () => {
  return store.num1 - store.num2
}

const add = () => {
  return store.num1 + store.num2
}

const equals = () => {
  let ans
  switch (store.op) {
    case 'divide':
      ans = divide()
      break
    case 'multiply':
      ans = multiply()
      break
    case 'subtract':
      ans = subtract()
      break
    case 'add':
      ans = add()
      break
  }
  store.mem = ans
  clear()
  $('#display').text(ans)
}

module.exports = {
  setOperator,
  clear,
  equals
}
