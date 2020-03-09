import React from 'react'
import {Link} from 'react-router-dom'


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
    <p>${amount} - created: {createdAt}</p>
  </div>
)

export default (ExpenseListItem)