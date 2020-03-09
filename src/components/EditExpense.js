import React from 'react'
import {connect} from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpense extends React.Component {
  editExpense = (expense) => {
    this.props.editExpense(this.props.expense.id, expense)
    console.log('updated', expense)
    this.props.history.push('/')
  }
  removeExpense = (id) => {
    this.props.removeExpense({id: this.props.expense.id})
    this.props.history.push('/')
  }
  render() {
    return (
    <div>
      <ExpenseForm
      expense={this.props.expense}
      onSubmit={this.editExpense}
      />
      <button onClick={this.removeExpense}>Remove</button>
    </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  }
}
const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: (id) => dispatch(removeExpense(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditExpense)