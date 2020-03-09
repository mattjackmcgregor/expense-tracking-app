import {addExpense, removeExpense, editExpense} from '../../actions/expenses'


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
    amount: 'test amount',
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

test('sets up addExpense action obj with defaults', () => {
  const action = addExpense()
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      description: '',
      note: '',
      amount: 0,
      createdAt: 0,
      id: expect.any(String)
    }
  })
})