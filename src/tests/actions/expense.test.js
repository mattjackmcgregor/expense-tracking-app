import {addExpense, removeExpense, editExpense, startAddExpense, setExpenses, startRemoveExpense, startEditExpense, startSetExpenses} from '../../actions/expenses'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import database from '../../firebase/firebase';
import expenses from '../fixtures/expenses'
import { remove } from 'jest-util/build/preRunMessage';

const createMockStore = configureMockStore([thunk])


  beforeEach((done) => {
    const expenseData = {}
    expenses.forEach(({id, description, amount, createdAt, note}) => {
      expenseData[id] = {description, amount, createdAt, note}
    })
    database.ref('expenses').set(expenseData).then(() => done())
  })


//remove expense
test('sets up removeExpense action obj', () => {
  const action = removeExpense({id: '123abc'})
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})
test('should remove expense from database', (done) => {
  const store = createMockStore({})
  const expenseData = expenses[0].id
  store.dispatch(startRemoveExpense({id: expenseData})).then(() =>{
    const actions = store.getActions()
    console.log(actions)
    expect(actions[0]).toEqual({
      type: "REMOVE_EXPENSE",
      id: expenseData
    })
    return database.ref(`expenses/${expenseData}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toBe(null) //or could use toBeFalsy()
    done()
  })
})

//edit expense
test('sets up editExpense action obj', () => {
  const action = editExpense('123abc', {note: 'test note'}) //make sure to observe parameters properly and when it is an object
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'test note'
    }
    
  })
})
test('should edit expense in database', (done) => {
  const store = createMockStore({})
  const id = expenses[0].id
  const updates = {
    description: 'edited description',
    amount: 400,
    note: 'this has been edited'
  }
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: "EDIT_EXPENSE",
      id,
      updates
    })
    return database.ref(`expenses/${id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toMatchObject(updates)
    done()
  })
})


//add expense
test('sets up addExpense action obj', () => {
  const expense = {
    description: 'test description',
    note: 'test note',
    amount: 200,
    createdAt: 100000
  }
  const action = addExpense(expense)
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expense,
      id: expect.any(String)
    }
  })
})

// test('should add expense to database and store', (done) => {
//   const store = createMockStore({});
//   const expenseData = {
//     description: 'Mouse',
//     amount: 3000,
//     note: 'This one is better',
//     createdAt: 1000
//   };
//   store.dispatch(startAddExpense(expenseData)).then(() => {
//     const actions = store.getActions();
//     expect(actions[0]).toEqual({
//       type: 'ADD_EXPENSE',
//       expense: {
//         id: expect.any(String),
//         ...expenseData
//       }
//     });
//     return database.ref(`expenses/${actions[0].expense.description}`).once('value');
//   }).then((snapshot) => {
//     expect(snapshot.val()).toEqual(expenseData);
//     done();
//   });
// });

// test('should add expense with defaults the database and store', (done) => {
//   const store = createMockStore({})
//   const expenseDataDefaults = {
//     description: '',
//     amount: 0,
//     note: '',
//     createdAt: 0
//   }
//   store.dispatch(startAddExpense(expenseDataDefaults)).then(() => {
//     const actions = store.getActions()
//     expect(actions[0]).toEqual({
//       type: 'ADD_EXPENSE',
//       expense: {
//         id: expect.any(String),
//         ...expenseDataDefaults
//       }
//     })
//     return database.ref(`expenses/${actions[0].expense.description}`).once('value')
//   }).then((snapshot) => {
//     expect(snapshot.val()).toEqual(expenseDataDefaults)
//     done()
//   })
  
// })

//set expense
test('sets up setExpense action', () => {
  const action = setExpenses(expenses)
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  })
})
test('should fetch data from datbase,', (done) => {
  const store = createMockStore({})
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    })
    done()
  })
})


// test('sets up addExpense action obj with defaults', () => {
//   const action = addExpense()
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0,
//       id: expect.any(String)
//     }
//   })
// })