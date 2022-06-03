export class Crypto {

    public async crypt(text: string): Promise<string> {
        const crypto = require('crypto')
        const alg = 'aes-256-ctr'
        const pwd = 'desafioBack'
        const cipher = crypto.createCipher(alg, pwd)
        const crypted = await cipher.update(text, 'utf8', 'hex')
        return crypted
    }

    public async decrypt(text: string): Promise<string> {
        const crypto = require('crypto')
        const alg = 'aes-256-ctr'
        const pwd = 'desafioBack'
        const decipher = crypto.createDecipher(alg, pwd)
        const plain = await decipher.update(text, 'utf8', 'hex')
        return plain
    }
}