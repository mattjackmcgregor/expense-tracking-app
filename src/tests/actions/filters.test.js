import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../../actions/filters'
import moment from 'moment'

test('sets up setEndDate action obj', () => {
  const action = setEndDate(moment(0))
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  })
})
test('sets up setStartDate action obj', () => {
  const action = setStartDate(moment(0))
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  })
})
test('sets up setTextFilter action obj', () => {
  const action = setTextFilter('test')
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'test'
  })
})
test('sets up setTextFilter action obj with defaults', () => {
  const action = setTextFilter()
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  })
})
test('sets up sortByDate action obj', () => {
  expect(sortByDate()).toEqual({
    type: 'SORT_BY_DATE',
  })
})
test('sets up SortByAmount action obj', () => {
  expect(sortByAmount()).toEqual({
    type: 'SORT_BY_AMOUNT'
  })
})