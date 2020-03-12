import {addExpense, removeExpense, editExpense, startAddExpense} from '../../actions/expenses'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk])

test('sets up removeExpense action obj', () => {
  const action = removeExpense({id: '123abc'})
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})

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

test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    return database.ref(`expenses/${actions[0].expense.description}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults the database and store', (done) => {
  const store = createMockStore({})
  const expenseDataDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  }
  store.dispatch(startAddExpense(expenseDataDefaults)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDataDefaults
      }
    })
    return database.ref(`expenses/${actions[0].expense.description}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDataDefaults)
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