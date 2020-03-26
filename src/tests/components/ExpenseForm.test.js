import React from 'react'
import {shallow} from 'enzyme'
import moment from 'moment'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

test('should render expenseForm component properly', () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot()
})
test('should render expenseForm with data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />)
  expect(wrapper).toMatchSnapshot()
})
test('should render error message for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot()
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(wrapper.state('error').length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot()
})
test('should render new decription change', () => {
  const value = 'new description'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(0).simulate('change', {
    target: {value}
  })
  expect(wrapper.state('description')).toBe(value)
})
test('should render new note change', () => {
  const value = 'new note'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('textarea').simulate('change', {
    target: {value}
  })
  expect(wrapper.state('note')).toBe(value)
})
test('should render new amount change', () => {
  const value = '80'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(1).simulate('change', {
    target: {value}
  })
  expect(wrapper.state('amount')).toBe(value)
})
test('should not render amount change', () => {
  const value = '80.80080'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(1).simulate('change', {
    target: {value}
  })
  expect(wrapper.state('amount')).toBe('')
  expect(wrapper).toMatchSnapshot()
})
test('should all onSubmit prop with valid form sumbission', () => {
  const onSubmitSpy = jest.fn()
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(wrapper.state('error')).toBe('')
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    createdAt: expenses[0].createdAt,
    note: expenses[0].note
  })
})
test('should set new date on date change', () => {
  const now = moment()
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now)
  expect(wrapper.state('createdAt')).toEqual(now)
})
test('should set calendarFocus on change', () => {
  const focused = true
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused})
  expect(wrapper.state('calendarFocused')).toBe(true)
  expect(wrapper.state('calendarFocused')).toBe(focused)
})
