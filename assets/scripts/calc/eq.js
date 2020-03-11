'use strict'

const store = require('../store')

// sets the store object and the display element back to default
const clear = () => {
  store.num1 = 0
  store.op = null
  store.num2 = 0
  store.waiting = false
  $('#display').text('0')
}

const roundDecimal = (str, limit) => {
  const split = str.split('.') // returns an array of strings before & after decimal

  // parseFloat changes string to number, toFixed rounds to number of characters left
  split[1] = (parseFloat('0.' + split[1])).toFixed(limit - (split[0].length + 1))

  // if rounded number is essentially zero, just display zero
  if (split[0] === '0') {
    return split[1]
  }

  // otherwise, return the sum of the whole number and the fraction(decimal)
  return split[0] + split[1]
}

const roundExponent = (str, limit) => {
  str = parseInt(str).toExponential() // returns a sigfig of display num

  const splitExp = str.split('e') // returns an array of strings before & after 'e'

  // resets limit as the number of spaces left after including exponent
  limit = limit - (splitExp[1].length + 1) // +1 accounts for the 'e'

  splitExp[0] = roundDecimal(splitExp[0], limit) // rounds the number portion

  return splitExp.join('e') // joins the sigfig back together around its 'e'!
}

// given the display text and a character limit, return a shortened display text
const toXPlaces = (str, limit) => {
  if (str.includes('.')) {
    return roundDecimal(str, limit) // return a rounded decimal
  } else {
    return roundExponent(str, limit) // return a sigfig, also rounded if needed
  }
}

const setOperator = (num1, op) => {
  store.num1 = num1
  store.op = op
  store.waiting = true // tells the calculator it's expecting a 2nd operand
}

const equals = () => {
  let ans // empty variable to receive answer to use later

  // depending on which operator is stored, complete the equation
  switch (store.op) {
    case 'divide':
      ans = store.num1 / store.num2
      break
    case 'multiply':
      ans = store.num1 * store.num2
      break
    case 'subtract':
      ans = store.num1 - store.num2
      break
    case 'add':
      ans = store.num1 + store.num2
      break
  }
  store.mem = ans // set the stored memory attribute to this answer
  clear() // clear the rest of the calculator
  $('#display').text(ans) // display the answer
}

module.exports = {
  setOperator,
  toXPlaces,
  clear,
  equals
}
