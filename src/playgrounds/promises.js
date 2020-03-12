const promise = new Promise((resolve, reject) =>{
  setTimeout(() =>{
    resolve('this is my resolved data')
  }, 2000)
})

console.log('before1')

promise.then((data) =>{
  console.log(data)
}).catch((error) =>{
  console.log(error)
})

console.log('after1')


const promise2 = new Promise((resolve, reject) =>{
  setTimeout(() =>{
    reject('this is my reject data')
  }, 5000)
})

console.log('before2')

promise2.then((data) =>{    //in Docs if things retun void it means it returns nothing, so if you try to put eg data and return it will return undefined
  console.log(data)
}).catch((error) =>{
  console.log(error)
})

console.log('after2')