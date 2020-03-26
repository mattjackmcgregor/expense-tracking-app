import React from 'react'
import { connect } from 'react-redux';
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../actions/filters'
import {DateRangePicker} from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'


export class ExpenseListFilters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      calendarFocused: null
    }
    this.onDatesChange=this.onDatesChange.bind(this)
    this.onFocusChange=this.onFocusChange.bind(this
      )
  }
  onDatesChange({startDate, endDate}) {
    this.props.setStartDate(startDate)
    this.props.setEndDate(endDate)
  }
  onFocusChange(calendarFocused) {
    this.setState(() => ({calendarFocused}))
  }
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate()
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount()
    }
  }
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value)
  }
  render() {
    return (
      <div className='content-container'>
        <div className="input-group">
          <div className='input-group__item'>
            <input className='text-input' type='text' placeholder='Search Expenses' value={this.props.filters.text} onChange={this.onTextChange} />
          </div>
          <div className='input-group__item'>
            <select className='input-select' value={this.props.filters.sortBy} onChange={this.onSortChange}>
              <option value="date">Date</option>
              <option value='amount'>Amount</option>
            </select>
          </div>
          <div className='input-group__item'>
            <DateRangePicker
              startDate={this.props.filters.startDate}
              startDateId='start date'
              endDate={this.props.filters.endDate}
              endDateId='end date'
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    )
  }
}
// const ExpenseListFilters = (props) => (
//   <div>
//     <input type='text' value={props.filters.text} onChange={(e) => {
//       props.dispatch(setTextFilter(e.target.value))
//     }} />
//     <select value={props.filters.sortBy} onChange={(e) => {
//       if (e.target.value === 'date') {
//         props.dispatch(sortByDate())
//       } else if (e.target.value === 'amount') {
//         props.dispatch(sortByAmount())
//       }
//     }}>
//       <option value="date">Date</option>
//       <option value='amount'>Amount</option>
//     </select>
//   </div>
// )

const mapStateToProps = (state) => (
  {
    filters: state.filters
  }
)
 

const mapDispatchToProps = (dispatch) => ({
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setTextFilter: (text) => dispatch(setTextFilter(text))

})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)