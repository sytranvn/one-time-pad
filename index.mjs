/**
 * Encrypt data using one time pad 
 * @param data ArrayBuffer data
 * @param key string|ArrayBuffer
 * @returns cypher string
 */
export function encrypt(data) {
  const key = new Uint8Array(10)
  for (let i = 0; i < 10; i++) {
    key[i] = randomInt() & 0b11111111
  }
  const encBuff = data.map((d, i) => d ^ key[i % 10])
  return [Buffer.from(key).toString('hex'), encBuff]
}


export function decrypt(cypher, key) {
  const keyBuff = Buffer.from(key, 'hex')
  return cypher.map((c, i) => c ^ keyBuff[i%10])
}

/**
 * Generate a random positive integer
 */
function randomInt() {
  return Number(Math
    .random()
    .toString(2)
    .replace('0.','0b')
    .slice(0, -1)) // last bit is always 1 so we don't need it
}
