import React from 'react'
import {connect} from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import getVisibleExpenses from '../selectors/expenses'


export const ExpenseList = (props) => (
  <div className='content-container'>
    <div className='list-header'>
    <div className='show-on-mobile'>Expenses</div>
    <div className='show-on-desktop'>Expense</div>
    <div className='show-on-desktop'>Amount</div>
    </div>
    <div className='list-body'>
      {
        props.expenses.length === 0 ? (
          <div className='list-item list-item--message'>
          <span>No Expenses</span>
          </div>
        ) : (
          props.expenses.map((expense) => (
            // <ExpenseListItem 
            //   key={expense.id}
            //   description={expense.description}
            //   amount={expense.amount}
            //   createdAt={expense.createdAt}
            // />
      
            //betterway using spread opperator to destruct it
            <ExpenseListItem key={expense.id} {...expense} />
          ))
        )
      }
    </div>
  </div>
)

const mapStateToProps = (state) => { //connect the stores state to the component props
  return {
    expenses: getVisibleExpenses(state.expenses, state.filters)
  }
}

export default connect(mapStateToProps)(ExpenseList) //this is essentially a HOC just xporting it straight instead of setting it to a variable 