const assert = require("assert")
try {
  assert.deepStrictEqual({ a: 1, b: 3 }, { b: 3, a: "1" }, "1")
} catch (error) {
  console.log(2)
}
//assert.equal(1, 12, '')