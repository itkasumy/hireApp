function hello() {
  console.log('I love Book')
}

function WrapHello(fn) {
  return function () {
    console.log('before say hello')
    fn()
    console.log('after say hello')
  }
}

hello = WrapHello(hello)
hello()
