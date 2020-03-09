import React from 'react'
import ExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters';

const ExpenseDashboard = () => (
  <div>
    this is the ExpenseDashboard
    <ExpenseListFilters />
    <ExpenseList />
  </div>
)

export default ExpenseDashboard