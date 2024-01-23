const keys = [
  ['e', 'enter'],
  ['i', 'imes'],
  ['o', 'ober'],
  ['a', 'ai'],
  ['u', 'ufat'],
]

const setOutputText = (output) => {
  document.querySelector('.encrypted-empty').style.display = 'none'
  document.querySelector('.output-message').style.display = 'flex'
  document.querySelector('.output-message p').textContent = output
}

const encryptMessage = () => {
  const messageInput = document.querySelector('.message-input').value
  if (!messageInput) return

  let encryptedText = messageInput.toLowerCase()

  for (let i = 0; i < keys.length; i++) {
    if (encryptedText.includes(keys[i][0])) {
      encryptedText = encryptedText.replaceAll(keys[i][0], keys[i][1])
    }
  }

  setOutputText(encryptedText)
}

const decryptMessage = () => {
  const messageInput = document.querySelector('.message-input').value
  if (!messageInput) return

  let encryptedText = messageInput.toLowerCase()

  for (let i = 0; i < keys.length; i++) {
    if (encryptedText.includes(keys[i][1])) {
      encryptedText = encryptedText.replaceAll(keys[i][1], keys[i][0])
    }
  }

  setOutputText(encryptedText)
}

const copyMessage = () => {
  const encryptedText = document.querySelector('.output-message p').textContent

  navigator.clipboard.writeText(encryptedText)

  document.querySelector('.encrypted-empty').style.display = 'flex'
  document.querySelector('.output-message').style.display = 'none'
  document.querySelector('.message-input').value = ''
}
