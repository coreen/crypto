const bcrypt = require('bcrypt')

// Resouce: https://stackoverflow.com/questions/46693430/what-are-salt-rounds-and-how-are-salts-stored-in-bcrypt
const SALT_ROUNDS = 15

// synchronous
const generateHash = (password) => bcrypt.hashSync(password, SALT_ROUNDS)

// asynchronous
const checkPassword = async (password, expectedHash) => {
  const match = await bcrypt.compare(password, expectedHash)

  console.log(match ? 'correct' : 'incorrect')
}

const password = 'admin'
const expectedHash = generateHash(password)

console.log(`password: ${password},\nexpectedHash: ${expectedHash}`)

checkPassword(password, expectedHash)
