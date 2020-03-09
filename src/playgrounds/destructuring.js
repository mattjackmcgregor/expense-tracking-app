const person = {
  name: 'matt',
  age: 23,
  location: {
    city: 'dub',
    temp: 88,
  },
  sport: 'surfing',
  developer: true,
  // rich: 'yes',
}

//object destructuring

// const {name, age} = person
// console.log(`name is ${name} and age is ${age}`)

//destructuring changing variable
// const {city: hometown, temp} = person.location
// console.log(`i live in ${hometown} its hot like ${temp}`)

// //destructuring setting a default
// const {male = 'not human' , sport} = person
// console.log(`my sport is ${sport} and im ${male}`)

// //all the above
// const {developer: canCode = 'i cant code', rich: balling = 'not balling'} = person
// console.log(`i ${canCode} and im ${balling}`)


// const book = {
//   title: 'ego is the way',
//   author: 'auther',
//   publisher: {
//     name:'penguin',
//   }
// }

// const {name = 'self published'} = book.publisher

// console.log(`${name}`)

//array destructuring
const address = ['15a','churchill st', 'whangarei']

const [, street, city, state = 'no state'] = address

console.log( street, city, state)

const item = ['coffee (hot)', '2.00','$2.50', '$27.5']

const [coffee, , medium] = item
console.log(`a medium ${coffee} cost ${medium}`)