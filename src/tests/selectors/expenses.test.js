import moment from 'moment'
import getVisibleExpenses from '../../selectors/expenses'
import expenses from '../fixtures/expenses'

test('filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startdate: undefined,
    endDate: undefined
  }
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([expenses[1], expenses[2]])
})
test('filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  }
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([expenses[0], expenses[2]])
})
test('filter by endDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0)
  }
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([expenses[1], expenses[0]])
})
test('filter by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([expenses[1], expenses[0], expenses[2]])
})
test('filter by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]])
})

