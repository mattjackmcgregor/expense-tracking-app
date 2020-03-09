import React from 'react'
import {shallow} from 'enzyme'
import {AddExpense} from '../../components/AddExpense'
import expenses from '../fixtures/expenses';

let addExpense, history, wrapper

beforeEach(() => {
  addExpense = jest.fn()
  history = {push: jest.fn()}
  wrapper = shallow(<AddExpense addExpense={addExpense} history={history} />)
})

test('should render addExpense page properly', () => {
  expect(wrapper).toMatchSnapshot()
})
test('should handle submit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(addExpense).toHaveBeenLastCalledWith(expenses[0])
})