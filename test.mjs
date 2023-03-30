import { encrypt, decrypt } from './index.mjs'
import { readFile, writeFile } from 'node:fs/promises'
import PNG from 'png-js'

const image = process.argv[2] || './images/broken.png'
const [imageName] = image.split('/').at(-1).split('.')
const fileBuffer = await readFile(image)
const file = new PNG(fileBuffer)

const [key, cypher] = encrypt(file.imgData)
console.log(`Key is: ${key}`)
const data = decrypt(cypher, key)

for (let i = 0; i < cypher.length; i++) {
  fileBuffer[file.imgDataOffset + i] = cypher[i]
}
await writeFile(`./out/${imageName}-hidden.png`, fileBuffer)
for (let i = 0; i < cypher.length; i++) {
  fileBuffer[file.imgDataOffset + i] = data[i]
}
await writeFile(`./out/${imageName}-recover.png`, fileBuffer)
