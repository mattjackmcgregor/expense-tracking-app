import expensesReducer from '../../reducers/expenses'
import moment from 'moment'
import uuid from 'uuid'
import expenses from '../fixtures/expenses';

test('set default state', () => {
  const state = expensesReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual([])
})
test('remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id  
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([expenses[0], expenses[2]])
})
test('should not remove expense when id isnt found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '11'
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses)
})
test('add expense to state ', () => {
  const expense = {
    id: uuid(),
    description: 'test',
    note: 'noted',
    amount: 500,
    createdAt: 1000
  }
  const action = {
    type: 'ADD_EXPENSE',
    expense
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([...expenses, expense])
})
test('edt expense ', () => {
  const description = 'edited'
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      description
    }
  }
  const state = expensesReducer(expenses, action)
  expect(state[1].description).toBe(description)
})
test('should not edit expense ', () => {
  const description = 'edited'
  const action = {
    type: 'EDIT_EXPENSE',
    id: 11,
    updates: {
      description
    }
  }
  const state = expensesReducer(expenses, action)
  expect(state[1].description).toBe('rent')
})