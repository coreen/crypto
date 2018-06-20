const crypto = require('crypto') // part of Node default library

// testing purposes only, hide in Vault and environment variables for production use
const PASSCODE_AUTHENTICATOR_KEY = '5A4UxqYM9o0eO6Y3bKHIsRPARxKMX87c'

const ALGORITHM = 'aes-256-cbc' // 256 bits = 32 bytes for authenticator key
const ORIGINAL_ENCODING = 'utf8'
const ENCRYPTED_ENCODING = 'base64'

// must be the same for both encryption and decryption,
// use Buffer.alloc(16) if running util on multiple servers
const initializationVector = crypto.randomBytes(16)

const encryptPasscode = (passcode) => {
  const key = PASSCODE_AUTHENTICATOR_KEY
//  let key
//  if (process.env.NODE_ENV !== 'production' && process.env.PASSCODE_AUTHENTICATOR_KEY === undefined) {
//    key = ‘length32PasscodeAuthenticatorKey’
//  } else {
//    key = process.env.PASSCODE_AUTHENTICATOR_KEY
//  }

  const cipher = crypto.createCipheriv(ALGORITHM, key, initializationVector)
  let encrypted = cipher.update(passcode, ORIGINAL_ENCODING, ENCRYPTED_ENCODING)
  encrypted += cipher.final(ENCRYPTED_ENCODING) // cannot encrypt anything else now

  return encrypted
}

const decryptPasscode = (encoded) => {
  const key = PASSCODE_AUTHENTICATOR_KEY
//  let key
//  if (process.env.NODE_ENV !== 'production' && process.env.PASSCODE_AUTHENTICATOR_KEY === undefined) {
//    key = 'length32PasscodeAuthenticatorKey'
//  } else {
//    key = process.env.PASSCODE_AUTHENTICATOR_KEY
//  }

  const decipher = crypto.createDecipheriv(ALGORITHM, key, initializationVector)
  let decrypted = decipher.update(encoded, ENCRYPTED_ENCODING, ORIGINAL_ENCODING)
  decrypted += decipher.final(ORIGINAL_ENCODING) // cannot decrypt anything else now

  return decrypted
}

const passcode = 'testing'
const encoded = encryptPasscode(passcode)
console.log('passcode', passcode)
console.log('encrypted', encoded)
console.log('decrypted', decryptPasscode(encoded))

