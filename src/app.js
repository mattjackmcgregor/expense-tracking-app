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

store.subscribe(() => {
  const state = store.getState()
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses)
})

const waterBill = store.dispatch(addExpense({description:'Water Bill', note: 'flat bill', amount: 60, createdAt: 2500}))
const powerBill = store.dispatch(addExpense({description:'Power Bill', note: 'flat bill', amount: 400, createdAt: 40000}))
const rent = store.dispatch(addExpense({description:'rent', note: 'flat bill', amount: 1000, createdAt: 20}))


// store.dispatch(setTextFilter('water'))


const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
  )


ReactDOM.render(jsx, document.getElementById('app'))