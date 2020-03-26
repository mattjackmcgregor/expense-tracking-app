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
  
  <Link className='list-item' to={`/edit/${id}`}>
    <div>
      <h4 className='list-item__title'>{description}</h4>
      <span className='list-item__date'>{moment(createdAt).format('MMMM Do YYYY')}</span>
    </div>
    <div>
      <h3 className='list-item__amount'>{numeral(amount/100).format('$0,0.00')}</h3>
    </div>
  </Link>

    
  
)

export default (ExpenseListItem)