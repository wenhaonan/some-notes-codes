const { floor, random } = Math

function randomNum(a, b, c, d) {
  let val = floor(random() * (b + 1 - a) + a)
  if (c == undefined || d == undefined) return val
  return (val > c && val < d) ? randomNum(a, b, c, d) : val
}
onmessage = function () {
  let randomPo = [];
  for (let i = 0; i < 100; i++) {
    let a = randomNum(-300, 800)
    if (a >= 0 && a <= 500) {
      b = randomNum(-200, 700, -50, 550)
    } else if (a < 0 || a > 500) {
      b = randomNum(-200, 700)
    }
    randomPo.push([a, b])
  }
  postMessage(randomPo)
}