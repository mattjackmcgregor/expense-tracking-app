import uuid from 'uuid'
import database from '../firebase/firebase'

//ADD_EXPENSE
export const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})
//START_ADD_EXPENSE
export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData
    const expense = {description, note, amount, createdAt}
    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }))
      console.log('expense stored in database')
    }).catch((e) => {
      console.log('failed', e)
    })
  }
}

//REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
  type : 'REMOVE_EXPENSE',
    id
})
//START_REMOVE_EXPENSE
export const startRemoveExpense = ({id} = {}) => {
  return(dispatch) => {
    console.log(id)
    return database.ref(`expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({id}))
      console.log(`removed expense id : ${id} from database`)
    }).catch((e) => {
      console.log('error', e)
    })
  }
}

//EDIT_EXPENSE
export const editExpense = (id, updates ) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
})  
//START_EDIT_EXPENSE
export const startEditExpense = (id, updates) => {
  return(dispatch) => {
    return database.ref(`expenses/${id}`).update(updates).then(() => {
      dispatch(editExpense(id, updates))
      console.log(`edited ${id} with updates: ${updates}`)
    }).catch((e) => {
      console.log('error', e)
    })
  }
}

//SET_EXPENSE
export const setExpenses = (expenses) => ({
  type: "SET_EXPENSES",
  expenses
})

//START_SET_EXPENSE
export const startSetExpenses = () => {
  return(dispatch) => {
    return database.ref('expenses').once('value').then((snapshot) => {
      const expenses = []
      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })        
      })
      return dispatch(setExpenses(expenses))
    })
    .catch((e) => {
      console.log('fetching failed', e)
    })
  }
}
