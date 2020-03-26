import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// console.log(firebaseConfig)
const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export {firebase, googleAuthProvider, database as default}

//SUBS
// //value
// database.ref('expenses').on('value', (snapshot) => {
//   console.log('child removed', snapshot.key, snapshot.val())
// })
// //child-removed
// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log('child removed', snapshot.key, snapshot.val())
// })
// //child-changed
// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log('child changed:', snapshot.key, snapshot.val())
// })
// //child_added
// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log('child added:', snapshot.key, snapshot.val())
// })

// // fetching array data from database and coverting it into array format
// const expensesSub = database.ref('expenses').on('value', (snapshot) => {
//   const expenses = []
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     })
//   })
//   console.log(expenses)
// })

// // How to send array to the database (creates unique id eg id:{description})
// database.ref('expenses').push({
//   description: 'expense1',
//   amount: 100,
//   note: 'not1',
//   createdAt: 23
// })
// database.ref('expenses').push({
//   description: 'expense2',
//   amount: 4400,
//   note: 'not1',
//   createdAt: 23
// })
// database.ref('expenses').push({
//   description: 'expense3',
//   amount: 10665,
//   note: 'not1',
//   createdAt: 23
// }) 

// //SETTING TO THE DATABASE
// database.ref().set({
//   name: 'matt mcgregor',
//   age: 23,
//   isSingle: true,
//   location: {
//     city: 'Dubcity'
//     country: 'Aotearoa'
//   }
// }).then(() => {
//   console.log('data has been set')
// }).catch((error) => {
//   console.log('this has been denied', error)
// })

//----------CRUD OPPERATIONS-------------

// //REMOVING FROM DATABASE
// database.ref('isSingle')
//   .remove()
//   .then(() => {
//   console.log('successfully removed')
//   }).catch((error) => {
//     console.log('this was denied', error)
//   })

// //UPDATING DATABASE ALSO DELETING AND ADDING IN SAME CALL
//   database.ref().update({
//     isSingle: null, //removing
//     jobDescription: 'software developer', //adding
//     name: 'MattJackMcgregor', //updating
//     'location/country': 'Aotearoa/NewZealand' //updating child keys syntax
//   }).then(() => {
//     console.log('data has been updated')
//   }).catch((error) => {
//     console.log('this update has been denied', error)
//   })

// //fetching from the database onetime
// database.ref()
//   .once('value')
//   .then((snapshot) => {
//     const data = snapshot.val()
//     console.log(data)
//   })
//   .catch((error) => {
//     console.log('this fetch has failed', error)
//   })

// //fetches and stays subscribed to database
// const onValueChange = database.ref().on('value', (snapshot) => { //seting as a const so it can be sub can be called on/off
//     const data = snapshot.val() //getting data snapshot
//     console.log(data)
// }, (e) => {
//   console.log('error ', e)
// })

// //unsubscribing from onvaluechange sub
// database.ref().off('value', onValueChange) //called with onvalue change will only unsub from that sub not affect others that may be 

// const nameAndWhereFrom = database.ref().on('value', (snapshot) => {
//   const data = snapshot.val()
//   console.log(`my name is ${data.name} and i live in ${data.location.city} in ${data.location.country}`)
// })