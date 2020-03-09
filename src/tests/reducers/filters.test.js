import moment from 'moment'
import filtersReducers from '../../reducers/filters'

test('set up default filter values', () => {
  const state = filtersReducers(undefined, {type: '@@INIT'})
  expect(state).toEqual({ 
      text: '',
      sortBy: 'date',
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month'),
  })
})
test('set sortBy to amount', () => {
  const state = filtersReducers(undefined, {type: 'SORT_BY_AMOUNT'})
  expect(state.sortBy).toBe('amount')
})
test('set sortBy to date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
  }
  const state = filtersReducers(currentState, {type: 'SORT_BY_DATE'})
  expect(state.sortBy).toBe('date')
})
test('set text Filter', () => {
  const text = 'rent'
  const action = {
    type: 'SET_TEXT_FILTER',
    text
  }
  const state = filtersReducers(undefined, action )
  expect(state.text).toBe('rent')
})
test('set startDate filter', () => {
  const startDate = moment(0)
  const action = {
    type: 'SET_START_DATE',
    startDate
  }
  const state = filtersReducers(undefined, action )
  expect(state.startDate).toEqual(moment(0))
})
test('set endDate filter', () => {
  const endDate = moment(0)
  const action = {
    type: 'SET_END_DATE',
    endDate
  }
  const state = filtersReducers(undefined, action )
  expect(state.endDate).toEqual(moment(0))
})



