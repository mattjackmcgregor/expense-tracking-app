import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import AppRouter from './routes/AppRouter'
import './styles/styles.scss'
import 'normalize.css/normalize.css'
import configureStore from './store/configureStore'
import {addExpense, removeExpense, editExpense} from './actions/expenses'
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from './actions/filters'
import getVisibleExpenses from './selectors/expenses'

const store = configureStore()


// store.dispatch(setTextFilter('water'))


const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
  )


ReactDOM.render(jsx, document.getElementById('app'))