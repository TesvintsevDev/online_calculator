const elMathLine = document.getElementById('math-line')
const elResult = document.getElementById('result')
const elKeyboard = document.getElementById('keyboard')

let firstNum = '0'
let secondNum = ''
let operator = ''
let result = ''

function clearVar() {
  firstNum = '0'
  secondNum = ''
  operator = ''
  result = ''
}

// основная ф-ция обработки
function main(value) {
  if (value.toLowerCase() == 'c') {
    clearVar()
  } else if (value == '=' || value == 'Enter') {
    if (operator == '' || operator == '%') return

    firstNum = +firstNum
    secondNum = +secondNum
    //                                       если result = NaN
    if (result !== '' && result != Infinity && result == result)
      //повтор действия (кроме %), при повторном нажатии '='
      firstNum = +result

    switch (operator) {
      case '+':
        result = firstNum + secondNum
        break
      case '-':
        result = firstNum - secondNum
        break
      case '/':
        result = firstNum / secondNum
        break
      case '*':
        result = firstNum * secondNum
        break
      default:
        result = ''
    }
  } else if (value == '.' || value == ',') {
    if (result !== '') clearVar()

    let number = operator == '' ? firstNum : secondNum
    if (number.match(/\./) || !number.length) return

    if (operator == '') firstNum += value
    else secondNum += value
  } else if (~'0123456789'.indexOf(value)) {
    if (result !== '') clearVar()

    if (operator == '') {
      if (firstNum == '0') firstNum = '' //не даём вводить лишние нули
      firstNum += value
    } else {
      if (secondNum == '0') secondNum = ''
      secondNum += value
    }
  } else if (~'+-/*%'.indexOf(value)) {
    operator = value
    result = ''

    if (value == '%') {
      firstNum = +firstNum
      secondNum = ''
      result = firstNum / 100
    }
  }

  elMathLine.textContent = `${firstNum} ${operator} ${secondNum}`
  elResult.textContent = `${result}`
}

// обработка нажатий на кнопки на экране
elKeyboard.addEventListener('click', (e) => main(e.target.textContent))

// обработка 'физической' клавиатуры
document.onkeypress = (e) => main(e.key)
