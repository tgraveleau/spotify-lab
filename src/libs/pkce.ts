import { CodeChallengeMethod } from 'expo-auth-session'
import * as Crypto from 'expo-crypto'

import { base64ToBase64Url } from './base64'

/**
 * Génère un code verifier aléatoire pour PKCE (Proof Key for Code Exchange)
 * Le verifier doit être une string URL-safe de 43-128 caractères
 * Conformément à la spécification RFC 7636
 */
const generateCodeVerifier = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
  let result = ''
  // Génère une string de 128 caractères pour plus de sécurité
  for (let i = 0; i < 128; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export const CODE_CHALLENGE_METHOD = CodeChallengeMethod.S256

/**
 * Génère le code challenge à partir du code verifier
 * Utilise SHA256 hash et encode en base64url (RFC 7636)
 */
export const generateCodeChallenge = async () => {
  const verifier = generateCodeVerifier()
  const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, verifier, {
    encoding: Crypto.CryptoEncoding.BASE64,
  })
  return base64ToBase64Url(hash)
}
