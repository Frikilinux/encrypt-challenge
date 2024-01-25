const keys = [
  ['e', 'enter'],
  ['i', 'imes'],
  ['a', 'ai'],
  ['o', 'ober'],
  ['u', 'ufat'],
]

const reverseKeys = () => {
  // Invierte las valor de cada array
  let newKeys = []
  for (let i = 0; i < keys.length; i++) {
    newKeys[i] = keys[i].reverse()
  }
  return newKeys
}

const setOutputText = (output) => {
  document.querySelector('.encrypted-empty').style.display = 'none'
  document.querySelector('.output-message').style.display = 'flex'
  document.querySelector('.output-message p').textContent = output
}

const processMsg = (action) => {
  let newKeys = keys

  // Invierte los arrays para reutilzar la iteración
  if (action === 'decrypt') {
    newKeys = reverseKeys()
  }

  const messageInput = document.querySelector('.input-message').value
  if (!messageInput) return

  let encryptedText = messageInput.toLowerCase()

  for (let i = 0; i < newKeys.length; i++) {
    if (encryptedText.includes(newKeys[i][0])) {
      encryptedText = encryptedText.replaceAll(newKeys[i][0], keys[i][1])
    }
  }

  setOutputText(encryptedText)
}

const copyMessage = () => {
  const encryptedText = document.querySelector('.output-message p').textContent

  navigator.clipboard.writeText(encryptedText)

  document.querySelector('.encrypted-empty').style.display = 'flex'
  document.querySelector('.output-message').style.display = 'none'
  document.querySelector('.input-message').value = ''
}
