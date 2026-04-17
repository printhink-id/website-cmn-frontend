import CryptoJS from 'crypto-js'

const SECRET = process.env.NEXT_PUBLIC_CRYPTO_SECRET

export const encryptId = id => {
  return CryptoJS.AES.encrypt(id.toString(), SECRET).toString()
}

export const decryptId = encrypted => {
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch {
    return null
  }
}
