const keys = [
  ['a', 'ai'],
  ['e', 'enter'],
  ['i', 'imes'],
  ['o', 'ober'],
  ['u', 'ufat'],
]

const getElement = (tags) => {
  return document.querySelector(tags)
}

const setOutputText = (output) => {
  getElement('.encrypted-empty').style.display = 'none'
  getElement('.output-message').style.display = 'flex'
  getElement('.crypted-message').textContent = output
}

const cleanText = () => {
  getElement('.input-message').value = ''
  getElement('.crypted-message').textContent = ''
  getElement('.encrypted-empty').style.display = 'flex'
  getElement('.output-message').style.display = 'none'
  setWarn('')
}

const handleInput = () => {
  getElement('.warning p').textContent = ''
}

const ilegalInput = (str) => {
  let regex = /[^a-z 0-9]/g
  return regex.test(str)
}

const setWarn = (text) => {
  getElement('.warning p').textContent = `${text}`
}

// Helper function to replace the character with the given keys
const searchAndReplace = (char) => {
  for (let i = 0; i < keys.length; i++) {
    if (char === keys[i][0]) return keys[i][1]
  }
  return char
}

// Encrypt message iterating message characters
const encryptMsg = (msg) => {
  let encryptedOutput = ''
  for (let i = 0; i < msg.length; i++) {
    encryptedOutput += searchAndReplace(msg[i])
  }
  return encryptedOutput
}

// Decrypt text usong replace method
const decryptText = (msg) => {
  let decryptedOutput = msg
  for (let i = 0; i < keys.length; i++) {
    decryptedOutput = decryptedOutput.replaceAll(keys[i][1], keys[i][0])
  }
  return decryptedOutput
}

// Main funtion
const processMsg = (action) => {
  const messageInput = document.querySelector('.input-message').value
  if (!messageInput) return

  if (ilegalInput(messageInput)) {
    setWarn('Sólo minúsculas y ninguna tilde. Corrige eso!, please.')
    return
  }

  if (action === 'decrypt') {
    setOutputText(decryptText(messageInput))
  } else {
    setOutputText(encryptMsg(messageInput))
  }
  window.location.replace('#output')
}

// Copy meesage using Clipboard API
const copyMsg = async () => {
  const text = getElement('.crypted-message').textContent
  try {
    await navigator.clipboard.writeText(text)
    cleanText()
    setWarn('Mensaje copiado al portapapeles')
  } catch (error) {
    setWarn('No se pudo copiar al portapapeles')
  }
}
