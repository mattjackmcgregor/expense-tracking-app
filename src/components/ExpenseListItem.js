import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'


// const ExpenseListItem = (props) => (
//   <div>
//     <p>description: {props.description}</p>
//     <p>Amount: {props.amount}</p>
//     <p>Created at: {props.createdAt}</p>
//   </div>
// )

//betterway descructuring
const ExpenseListItem = ({id, description, amount, createdAt}) => (
  <div>
  <Link to={`/edit/${id}`}><h4>{description}</h4></Link>
    <p>
    {numeral(amount/100).format('$0,0.00')} - created: {moment(createdAt).format('MMMM Do YYYY')}</p>
  </div>
)

export default (ExpenseListItem)