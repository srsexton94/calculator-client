'use strict'

const store = require('../store')

const clear = () => {
  store.num1 = 0
  store.op = null
  store.num2 = 0
  store.waiting = false
  $('#display').text('0')
}

const roundDecimal = (str, num) => {
  const split = str.split('.')
  split[1] = (parseFloat('0.' + split[1])).toFixed(num - (split[0].length + 1))
  return split[0] + split[1]
}

const roundExponent = (str, num) => {
  str = parseInt(str).toExponential()
  const splitExp = str.split('e')
  num = num - (splitExp[1].length + 1)
  splitExp[0] = roundDecimal(splitExp[0], num)
  return splitExp.join('e')
}

const toXPlaces = (str, num) => {
  if (str.includes('.')) {
    roundDecimal(str, num)
  } else {
    roundExponent(str, num)
  }
}

const setOperator = (num1, op) => {
  store.num1 = num1
  store.op = op
  store.waiting = true
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
  toXPlaces,
  clear,
  equals
}
