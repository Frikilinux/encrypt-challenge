const keys = [
  ['a', 'ai'],
  ['e', 'enter'],
  ['i', 'imes'],
  ['o', 'ober'],
  ['u', 'ufat'],
]

const reverseKeys = () => {
  const reverseKeys = keys.reverse()

  let newKeys = []
  for (let i = 0; i < reverseKeys.length; i++) {
    newKeys[i] = reverseKeys[i].reverse()
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

  if (action === 'decrypt') {
    newKeys = reverseKeys()
  }

  const messageInput = document.querySelector('.message-input').value
  if (!messageInput) return

  let encryptedText = messageInput.toLowerCase()

  for (let i = 0; i < newKeys.length; i++) {
    if (encryptedText.includes(newKeys[i][0])) {
      encryptedText = encryptedText.replaceAll(newKeys[i][0], keys[i][1])
    }
  }

  setOutputText(encryptedText)
}

// const decryptMessage = () => {
//   const messageInput = document.querySelector('.message-input').value
//   if (!messageInput) return

//   let encryptedText = messageInput.toLowerCase()

//   for (let i = 0; i < keys.length; i++) {
//     if (encryptedText.includes(keys[i][1])) {
//       encryptedText = encryptedText.replaceAll(keys[i][1], keys[i][0])
//     }
//   }

//   setOutputText(encryptedText)
// }

const copyMessage = () => {
  const encryptedText = document.querySelector('.output-message p').textContent

  navigator.clipboard.writeText(encryptedText)

  document.querySelector('.encrypted-empty').style.display = 'flex'
  document.querySelector('.output-message').style.display = 'none'
  document.querySelector('.message-input').value = ''
}
