/**
 * Convertit une string base64 en base64url (RFC 7636)
 * Remplace + par -, / par _, et supprime les padding =
 */
export const base64ToBase64Url = (base64: string): string => {
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}
