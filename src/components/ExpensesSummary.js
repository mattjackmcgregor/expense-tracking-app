import React from 'react'
import {connect} from 'react-redux'
import getVisibleExpenses from '../selectors/expenses'
import getExpensesTotal from '../selectors/expenses-total'
import numeral from 'numeral'


export const ExpensesSummary = ({expensesCount, expensesTotal}) => {
  const expenseWord = expensesCount === 1 ? 'expense' : 'expenses'
  const formattedExpenseTotal = numeral(expensesTotal / 100).format('$0,00.00')
  return (
    <div>
      <h3>Viewing {expensesCount} {expenseWord} totaling {formattedExpenseTotal} </h3>
    </div>
  )
}
  
 



const mapStateToProps = (state) => {
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  return {
    expensesCount: visibleExpenses.length,
    expensesTotal: getExpensesTotal(visibleExpenses)
  }
}
export default connect(mapStateToProps)(ExpensesSummary)