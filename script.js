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
  getElement('.crypted-message').textContent = output
}

const cleanText = () => {
  getElement('.input-message').value = ''
  getElement('.crypted-message').textContent = ''
  getElement('.encrypted-empty').style.display = 'flex'
  getElement('.output-message').style.display = 'none'
  setWarn('')
}

const handleInput = (e) => {
  if (/[A-Z]$/.test(e.key) || /[áéíóú]/i.test(e.key)) {
    e.preventDefault()
    setWarn('Sólo minúsculas y ninguna tilde, please')
    return
  }
  getElement('.warning').textContent = ''
}

const setWarn = (text) => {
  // getElement('.warning p').classList.add('warning-text')
  getElement('.warning').innerHTML = `<span>&#x1F6C8;</span>
  <p>${text}</p>`
}

const processMsg = (action) => {
  const k = [0, 1]
  action === 'decrypt' && k.reverse()

  const messageInput = document.querySelector('.input-message').value
  if (!messageInput) return
  let encryptedText = messageInput.toLowerCase()

  for (let i = 0; i < keys.length; i++) {
    encryptedText = encryptedText.replaceAll(keys[i][k[0]], keys[i][k[1]])
  }
  setOutputText(encryptedText)
  window.location.replace('#output')
}

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
