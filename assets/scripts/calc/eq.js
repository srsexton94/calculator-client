'use strict'

let store = require('../store')

const clear = () => {
  store.num1 = 0
  store.op = null
  store.num2 = 0
  store.waiting = false
  $('#display').text('0')
}

const divide = () => {
  //
}

const multiply = () => {
  //
}

const subtract = () => {
  //
}

const add = () => {
  //
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
  clear,
  equals
}
