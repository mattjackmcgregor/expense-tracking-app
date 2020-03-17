import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import AppRouter from './routes/AppRouter'
import configureStore from './store/configureStore'
import {startSetExpense} from './actions/expenses'
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from './actions/filters'
import getVisibleExpenses from './selectors/expenses'
import {firebase} from './firebase/firebase'
import './styles/styles.scss'
import 'normalize.css/normalize.css'



const store = configureStore()
console.log(process.env.FIREBASE_API_KEY)

// store.dispatch(setTextFilter('water'))


const jsx = ( 
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'))

store.dispatch(startSetExpense()).then(() =>{
  ReactDOM.render(jsx, document.getElementById('app'))
})

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    console.log('login')
  } else {
    console.log('logout')
  }
})