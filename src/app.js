import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import AppRouter from './routes/AppRouter'
import configureStore from './store/configureStore'
import {addExpense, removeExpense, editExpense} from './actions/expenses'
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from './actions/filters'
import getVisibleExpenses from './selectors/expenses'
import './styles/styles.scss'
import 'normalize.css/normalize.css'

const store = configureStore()
console.log('test')

// store.dispatch(setTextFilter('water'))


const jsx = ( 
  <Provider store={store}>
    <AppRouter />
  </Provider>
  )


ReactDOM.render(jsx, document.getElementById('app'))