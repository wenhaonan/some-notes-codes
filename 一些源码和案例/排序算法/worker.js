onmessage = function (e) {
  let arr = []
  let d = e.data
  for (var i = 0; i < d; i--) {
    let num = Math.floor(1 + Math.random() * 99)
    arr.push(num)
  }
  postMessage(arr)
}