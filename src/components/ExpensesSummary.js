import React from 'react'
import {connect} from 'react-redux'
import getVisibleExpenses from '../selectors/expenses'
import getExpensesTotal from '../selectors/expenses-total'
import numeral from 'numeral'
import {Link} from 'react-router-dom'


export const ExpensesSummary = ({expenseList, expensesCount, expensesTotal}) => {
  const expenseWord = expensesCount === 1 ? 'expense' : 'expenses'
  const filterActiveSubtitle = expensesCount !== expenseList.length ? '(Remove filters to see all)' : ''
  const formattedExpenseTotal = numeral(expensesTotal / 100).format('$0,00.00')
  return (
    <div className='page-header'>
    <div className='content-container'> 
      <h3 className='page-header__title'>Viewing <span>{expensesCount}</span> {expenseWord} totaling <span>{formattedExpenseTotal}</span></h3>
      <div className='page-header__content'>
      <p className='page-header__subtitle'>{expenseList.length} expenses total {filterActiveSubtitle}</p>
      </div>
      <div className='page-header__actions'>
        <Link className='button' to='/create'>Add Expense</Link>
      </div>
    </div>
    </div>
  )
}
  

const mapStateToProps = (state) => {
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  return {
    expenseList: state.expenses,
    expensesCount: visibleExpenses.length,
    expensesTotal: getExpensesTotal(visibleExpenses)
  }
}
export default connect(mapStateToProps)(ExpensesSummary)