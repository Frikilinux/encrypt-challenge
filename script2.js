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
  getElement('.warning p').textContent = ''
}

function getElement(element) {
  return document.querySelector(element)
}

function handleInput(e) {
  console.log(e)
  if (/^[A-Z]*$/.test(e.key) || /[áéíóú]/i.test(e.key)) {
    e.preventDefault()
    setWarn('Sólo minúsculas y nigún tilde, please')
    return
  }
  getElement('.warning p').textContent = ''
}

getElement('.input-message').addEventListener('keydown', handleInput)

function setWarn(text) {
  getElement('.warning p').classList.add('warning-text')
  getElement('.warning p').textContent = text
}

function processMsg() {
  const inputMsg = getElement('.input-message').value
  if (!inputMsg) return
  const outputMsg = inputMsg.replace(/[aeiouáéíóú]/gi, (char) => {
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

async function copyMsg() {
  const text = getElement('.crypted-message').value
  try {
    await navigator.clipboard.writeText(text)
    cleanText()
    setWarn('Mensaje copiado al portapapeles')
  } catch (error) {
    setWarn('No se pudo copiar al portapapeles')
  }
}
