import React from 'react'
import moment from 'moment'
import {SingleDatePicker} from 'react-dates'
// import 'react-dates/initialize'
// import 'react-dates/lib/css/_datepicker.css'

const mom = moment().format('MMM Do YYYY')
console.log(mom)


export default class ExpenseForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? props.expense.amount / 100 : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    }
    this.onDescriptionChange=this.onDescriptionChange.bind(this)
    this.onNoteChange=this.onNoteChange.bind(this)
    this.onAmountChange=this.onAmountChange.bind(this)
    this.onDateChange=this.onDateChange.bind(this)
    this.onFocusChange=this.onFocusChange.bind(this)
    this.submit=this.submit.bind(this)
  }
  onDescriptionChange(e) {
    const description = e.target.value  //setting to description varilabe for easy destructuring below
    this.setState(() => ({description})) 
  }
  onNoteChange(e) {
    const note = e.target.value 
    this.setState(() => ({note}))
  }
  onAmountChange(e) {
    const amount = e.target.value
    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
      this.setState(() =>({amount}))
    }
  }
  onDateChange(createdAt) {
    if(createdAt) {
      this.setState(() => ({createdAt}))
    }
  }
  
  onFocusChange({focused}) {
    this.setState(() =>({calendarFocused: focused}))
  }

  submit(e) {
    e.preventDefault()
    if(!this.state.description && !this.state.amount) {
      //error message
      this.setState(() =>({error: 'Please enter a description and amount'}))
    } else if(!this.state.description){
      this.setState(() =>({error: 'Please enter a description' }))
    } else if (!this.state.amount) {
      this.setState(() =>({error: 'Please enter an amount' }))
    } else {
      //submit
      this.setState(() =>({error: ''}))
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) *100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      })
    }
  }
  render() {
    return (
      <div>
      <h1>Expense Form</h1>
      {this.state.error && <p>{this.state.error}</p>}
      <form onSubmit={this.submit}> 
        <input 
          type='text' 
          placeholder='Description'
          value={this.state.description}
          autoFocus
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <input
          type='text'
          placeholder='add a note for your expense (optional'
          value={this.state.note}
          onChange={this.onNoteChange}
        />
        <button>Add Expense</button>
      </form>
    </div>
    )
  }
}