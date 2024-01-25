const keys = {
  ai: ['a', 'á'],
  enter: ['e', 'é'],
  imes: ['i', 'í'],
  ober: ['o', 'ó'],
  ufat: ['u', 'ú'],
}

const setOutput = (outputMsg) => {
  getElement('.encrypted-empty').style.display = 'none'
  getElement('.output-message').style.display = 'flex'
  getElement('.crypted-message').value = outputMsg
}

const cleanText = () => {
  getElement('.input-message').value = ''
  getElement('.crypted-message').value = ''
  getElement('.encrypted-empty').style.display = 'flex'
  getElement('.output-message').style.display = 'none'
}

function getElement(element) {
  return document.querySelector(element)
}

function setWarn(text) {
  getElement('.warning p').classList.add('warning-text')
  getElement('.warning p').textContent = text
}

function processMsg() {
  const inputMsg = getElement('.input-message').value
  const regx = /[aeiouáéíóú]/gi
  if (!inputMsg) return
  const outputMsg = inputMsg.replace(regx, (char) => {
    for (let key in keys) {
      if (keys[key].includes(char.toLowerCase())) return key
    }
  })
  setOutput(outputMsg)
}

function decrypt() {
  const inputMsg = getElement('.input-message').value
  if (!inputMsg) return
  const outputMsg = inputMsg.replace(/(enter|imes|ai|ober|ufat)/g, (char) => {
    for (let key in keys) {
      if (key === char) return keys[key][0]
    }
  })
  setOutput(outputMsg)
}

function copyMsg() {
  const text = getElement('.crypted-message').value
  navigator.clipboard.writeText(text)
  cleanText()
}
