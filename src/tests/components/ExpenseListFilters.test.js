import React from 'react'
import {shallow} from 'enzyme'
import {ExpenseListFilters} from '../../components/ExpenseListFilters'
import {filters, altFilters} from '../fixtures/filters';


let wrapper, setTextFilter, setStartDate, setEndDate, sortByDate, sortByAmount

beforeEach(() => {
  setTextFilter = jest.fn()
  setStartDate = jest.fn()
  setEndDate = jest.fn()
  sortByAmount = jest.fn()
  sortByDate = jest.fn()
  wrapper = shallow(
    <ExpenseListFilters 
      filters={filters}
      setTextFilter={setTextFilter}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
    />
  )
})

test('renders expenseListFilters properly', () => {
  expect(wrapper).toMatchSnapshot()
})
test('renders expenseListFilters with altFilters properly', () => {
  wrapper.setProps({
    filters: altFilters
  })
  expect(wrapper).toMatchSnapshot()
})
test('should handle text change', () => {
  const value = 'Bills'
  wrapper.find('input').at(0).simulate('change', {
    target: {value}
  })
  expect(setTextFilter).toHaveBeenLastCalledWith(value)
})
test('should sort by date', () => {
  const value = 'date'
  wrapper.find('select').simulate('change', {
    target: {value}
  })
  expect(sortByDate).toHaveBeenCalled()
})
test('should sort by amount', () => {
  const value = 'amount'
  wrapper.find('select').simulate('change', {
    target: {value}
  })
  expect(sortByAmount).toHaveBeenCalled()
})
test('should handle date changes', () => {
  const {startDate, endDate} = altFilters
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate})
  expect(setStartDate).toHaveBeenLastCalledWith(startDate)
  expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})
test('should handle date focus changes', () => {
  const calendarFocused = 'startDate'
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused)
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
  
})