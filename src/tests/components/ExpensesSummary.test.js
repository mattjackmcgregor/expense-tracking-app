import React from 'react'
import {shallow} from 'enzyme'
import {ExpensesSummary} from '../../components/ExpensesSummary'

test('should correctly render ExpensesSummary with 1 expense', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={300}  />)
  expect(wrapper).toMatchSnapshot()
})
test('should correctly render ExpensesSummary with multiple expense', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={3} expensesTotal={1200}  />)
  expect(wrapper).toMatchSnapshot()
})