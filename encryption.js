require('dotenv').config();
const crypto = require('crypto');
const encryptionkey = process.env.ENCRYPTIONKEY;
function encrypt(text) {
    let cipher = crypto.createCipher('aes-256-cbc',encryptionkey);
    let encrypt = cipher.update(text,'utf8','hex');
    encrypt += cipher.final('hex');
    return encrypt;
}
// Function to decrypt data
function decrypt(encryptedText) {
    let decipher = crypto.createDecipher('aes-256-cbc', encryptionkey);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
  module.exports = {encrypt,decrypt};