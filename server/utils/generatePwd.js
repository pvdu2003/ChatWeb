const crypto = require("crypto");

function generatePwd(length = 12) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let password = "";

  // Generate random characters using crypto
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charactersLength); // Generate a secure random index
    password += characters[randomIndex]; // Append the character at the random index
  }

  return password;
}
module.exports = generatePwd;
