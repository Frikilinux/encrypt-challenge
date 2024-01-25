const keys = [
  ['e', 'enter'],
  ['i', 'imes'],
  ['a', 'ai'],
  ['o', 'ober'],
  ['u', 'ufat'],
]

const getElement = (element) => {
  return document.querySelector(element)
}

const setOutputText = (output) => {
  getElement('.encrypted-empty').style.display = 'none'
  getElement('.output-message').style.display = 'flex'
  getElement('.crypted-message').value = output
}

const cleanText = () => {
  getElement('.input-message').value = ''
  getElement('.crypted-message').value = ''
  getElement('.encrypted-empty').style.display = 'flex'
  getElement('.output-message').style.display = 'none'
  setWarn('')
}

const handleInput = (e) => {
  if (/^[A-Z]*$/.test(e.key) || /[áéíóú]/i.test(e.key)) {
    e.preventDefault()
    setWarn('Sólo minúsculas y nigún tilde, please')
    return
  }
  getElement('.warning p').textContent = ''
}

const setWarn = (text) => {
  getElement('.warning p').classList.add('warning-text')
  getElement('.warning p').textContent = text
}

const processMsg = (action) => {
  const k = [0, 1]
  if (action === 'decrypt') k.reverse()

  const messageInput = document.querySelector('.input-message').value
  if (!messageInput) return
  let encryptedText = messageInput.toLowerCase()

  for (let i = 0; i < keys.length; i++) {
    encryptedText = encryptedText.replaceAll(keys[i][k[0]], keys[i][k[1]])
  }

  setOutputText(encryptedText)
}

const copyMsg = async () => {
  const text = getElement('.crypted-message').value
  try {
    await navigator.clipboard.writeText(text)
    cleanText()
    setWarn('Mensaje copiado al portapapeles')
  } catch (error) {
    setWarn('No se pudo copiar al portapapeles')
  }
}
