import {createStore, combineReducers} from 'redux'
import uuid from 'uuid'

//action generators

//ADD_EXPENSE
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

//REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
  type : 'REMOVE_EXPENSE',
    id
})

//EDIT_EXPENSE
const editExpense = (id, updates ) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
})

//SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: "SET_TEXT_FILTER",
  text
})

//SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
})

//SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
})

//SET_START_DATE
const setStartDate = (startDate = undefined) => ({
  type: "SET_START_DATE",
  startDate
})

//SET_END_DATE
const setEndDate = (endDate = undefined) => ({
  type: "SET_END_DATE",
  endDate
})
//expenses reducer
const expensesReducerDefaultState = []

const expenseReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state, 
        action.expense
      ]
    case 'REMOVE_EXPENSE':
      return state.filter(({id}) =>{
        return id !== action.id
      })
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }

        } else {
          return expense
        }
      })

    default:
      return state
  }
}

//filters reducer
const filtersDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const filtersReducer = (state = filtersDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {     //returns new object (you dont want to change actual state)
        ...state,  //gets all existing data 
        text: action.text  //overides text feild with new data
      }
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: 'date'
      }
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: 'amount'
      }
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate
      }
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate
      }

    default:
      return state
  }
}

//search filter
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
    const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase())

    return startDateMatch && endDateMatch && textMatch
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? -1 : 1
    } else if (sortBy === 'amount') {
      return a.amount > b.amount ? -1 : 1
    }
    
  })
}

const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    filters: filtersReducer
  })
)

store.subscribe(() => {
  const state = store.getState()
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses)
})

const expenseOne = store.dispatch(addExpense({description: 'Rent', amount: 100, createdAt: -1000}))
const expenseTwo = store.dispatch(addExpense({description: 'food', amount: 50, createdAt: 1000}))

// store.dispatch(removeExpense({id: expenseOne.expense.id}))
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 200}))

// store.dispatch(setTextFilter('re'))
// store.dispatch(setTextFilter(''))
// store.dispatch(sortByDate())
store.dispatch(sortByAmount())

// store.dispatch(setStartDate(250))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(1250))

const demoState = {
  expenses: [{
    id: 'vfdsvdf',
    description: 'january rent',
    note: 'final payment',
    amount: 50000,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'date', //date or amount
    startDate: undefined,
    endDate: undefined
  }
}

