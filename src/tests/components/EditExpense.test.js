import React from 'react'
import {shallow} from 'enzyme'
import {EditExpense} from '../../components/EditExpense'
import expenses from '../fixtures/expenses';


let wrapper, startEditExpense, startRemoveExpense, history
//spies
beforeEach(() => {
  startEditExpense = jest.fn()
  startRemoveExpense = jest.fn()
  history = {push: jest.fn()}
  wrapper = shallow(
    <EditExpense 
    startEditExpense={startEditExpense} 
      startRemoveExpense={startRemoveExpense} 
      history={history} 
      expense={expenses[0]}/>)

})

test('should render editExpense component properly', () => {
  expect(wrapper).toMatchSnapshot()
})
test('should handle editExpense properly', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0])
})
test('should hanlde startRemoveExpense ', () => {
  wrapper.find('button').simulate('click')
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expenses[0].id})
})