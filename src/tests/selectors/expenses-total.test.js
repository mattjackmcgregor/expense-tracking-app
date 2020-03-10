import expensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('should return 0 if no expenses', () => {
  const res = expensesTotal([])
  expect(res).toBe(0)
})
test('should correctly add up more then 1 expense', () => {
  expect(expensesTotal(expenses)).toBe(30000)
})
test('should correctly add up a single expense', () => {
  const res = expensesTotal([expenses[0]])
  expect(res).toBe(10000)
})