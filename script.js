const keys = [
  ['e', 'enter'],
  ['i', 'imes'],
  ['o', 'ober'],
  ['a', 'ai'],
  ['u', 'ufat'],
]

const encryptMessage = () => {
  const messageInput = document.querySelector('.message-input').value
  if (!messageInput) return

  let encryptedText = messageInput.toLowerCase()

  for (let i = 0; i < keys.length; i++) {
    if (encryptedText.includes(keys[i][0])) {
      encryptedText = encryptedText.replaceAll(keys[i][0], keys[i][1])
    }
  }

  document.querySelector('.no-message').style.display = 'none'
  document.querySelector('.encrypted-message').style.display = 'block'
  document.querySelector('.encrypted-message').textContent = encryptedText
  document.querySelector('.copy').style.display = 'block'
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

  document.querySelector('.no-message').style.display = 'none'
  document.querySelector('.encrypted-message').style.display = 'block'
  document.querySelector('.encrypted-message').textContent = encryptedText
  document.querySelector('.copy').style.display = 'block'
}

const copyMessage = () => {
  const encryptedText = document.querySelector('.encrypted-message').textContent

  navigator.clipboard.writeText(encryptedText).then(
    () => {
      console.log('Text copied to clipboard')
    },
    () => {
      /* clipboard write failed */
      console.log('Failed to copy text')
    }
  )

  document.querySelector('.no-message').style.display = 'block'
  document.querySelector('.encrypted-message').style.display = 'none'
  document.querySelector('.copy').style.display = 'none'
  document.querySelector('.message-input').value = ''
}
