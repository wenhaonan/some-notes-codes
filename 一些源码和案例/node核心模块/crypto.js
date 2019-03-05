const crypto = require("crypto")

const KEY = "wenhaonanshigedashuaibi"

const KEY1 = "haonan"

const obj = crypto.createHash("md5")

obj.update(KEY)

const password = obj.digest("hex")

//obj.update(KEY1)

//const password1 = obj.digest("hex")

console.log(password)

//console.log(password1)