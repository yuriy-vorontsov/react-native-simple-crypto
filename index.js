'use strict'

import base64js from 'base64-js'
import hexLite from 'hex-lite'
import { NativeModules } from 'react-native'

function convertArrayBufferToUtf8 (arrayBuffer) {
  const array = new Uint8Array(arrayBuffer)
  const chars = []
  let i = 0

  while (i < array.length) {
    const byte = array[i]
    if (byte < 128) {
      chars.push(String.fromCharCode(byte))
      i++
    } else if (byte > 191 && byte < 224) {
      chars.push(
        String.fromCharCode(((byte & 0x1f) << 6) | (array[i + 1] & 0x3f))
      )
      i += 2
    } else {
      chars.push(
        String.fromCharCode(
          ((byte & 0x0f) << 12) |
          ((array[i + 1] & 0x3f) << 6) |
          (array[i + 2] & 0x3f)
        )
      )
      i += 3
    }
  }

  return chars.join('')
}

function convertUtf8ToArrayBuffer (utf8) {
  const bytes = []

  let i = 0
  utf8 = encodeURI(utf8)
  while (i < utf8.length) {
    const byte = utf8.charCodeAt(i++)
    if (byte === 37) {
      bytes.push(parseInt(utf8.substr(i, 2), 16))
      i += 2
    } else {
      bytes.push(byte)
    }
  }

  const array = new Uint8Array(bytes)
  return array.buffer
}

function convertArrayBufferToBase64 (arrayBuffer) {
  return base64js.fromByteArray(new Uint8Array(arrayBuffer))
}

function convertBase64ToArrayBuffer (base64) {
  return base64js.toByteArray(base64).buffer
}

const convertArrayBufferToHex = hexLite.fromBuffer

const convertHexToArrayBuffer = hexLite.toBuffer

async function randomBytes (length) {
  return convertBase64ToArrayBuffer(await NativeModules.RNRandomBytes.randomBytes(length))
}

async function SHAWrapper (data, algorithm) {
  if (typeof data === 'string') {
    return NativeModules.Sha.shaUtf8(data, algorithm)
  } else {
    const dataBase64 = convertArrayBufferToBase64(data)
    const result = await NativeModules.Sha.shaBase64(dataBase64, algorithm)

    return convertBase64ToArrayBuffer(result)
  }
}

const AES = {
  encrypt: async function (textArrayBuffer, keyArrayBuffer, ivArrayBuffer) {
    const textBase64 = convertArrayBufferToBase64(textArrayBuffer)
    const keyHex = convertArrayBufferToHex(keyArrayBuffer)
    const ivHex = convertArrayBufferToHex(ivArrayBuffer)
    return convertBase64ToArrayBuffer(await NativeModules.Aes.encrypt(textBase64, keyHex, ivHex))
  },
  decrypt: async function (cipherTextArrayBuffer, keyArrayBuffer, ivArrayBuffer) {
    const cipherTextBase64 = convertArrayBufferToBase64(cipherTextArrayBuffer)
    const keyHex = convertArrayBufferToHex(keyArrayBuffer)
    const ivHex = convertArrayBufferToHex(ivArrayBuffer)
    return convertBase64ToArrayBuffer(await NativeModules.Aes.decrypt(cipherTextBase64, keyHex, ivHex))
  }
}

const SHA = {
  sha1: data => SHAWrapper(data, 'SHA-1'),
  sha256: data => SHAWrapper(data, 'SHA-256'),
  sha512: data => SHAWrapper(data, 'SHA-512')
}

const HMAC = {
  hmac256: function (textArrayBuffer, keyArrayBuffer) {
    const textHex = convertArrayBufferToHex(textArrayBuffer)
    const keyHex = convertArrayBufferToHex(keyArrayBuffer)
    return new Promise((resolve, reject) => {
      NativeModules.Hmac.hmac256(textHex, keyHex)
        .then(signatureHex => {
          const result = convertHexToArrayBuffer(signatureHex)
          resolve(result)
        })
        .catch(error => reject(error))
    })
  }
}

const PBKDF2 = {
  hash: function (password, saltArrayBuffer, iterations, keyLength, hash) {
    const saltBase64 = convertArrayBufferToBase64(saltArrayBuffer)
    return new Promise((resolve, reject) => {
      NativeModules.Pbkdf2.hash(
        password,
        saltBase64,
        iterations,
        keyLength,
        hash
      )
        .then(hashHex => {
          const result = convertHexToArrayBuffer(hashHex)
          resolve(result)
        })
        .catch(error => reject(error))
    })
  }
}

const RSA = NativeModules.Rsa

const utils = {
  randomBytes: randomBytes,
  convertArrayBufferToUtf8: convertArrayBufferToUtf8,
  convertUtf8ToArrayBuffer: convertUtf8ToArrayBuffer,
  convertArrayBufferToBase64: convertArrayBufferToBase64,
  convertBase64ToArrayBuffer: convertBase64ToArrayBuffer,
  convertArrayBufferToHex: convertArrayBufferToHex,
  convertHexToArrayBuffer: convertHexToArrayBuffer
}

export default {
  AES: AES,
  SHA: SHA,
  HMAC: HMAC,
  PBKDF2: PBKDF2,
  RSA: RSA,
  utils: utils
}
