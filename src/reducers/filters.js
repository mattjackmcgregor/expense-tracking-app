import moment from 'moment'

//filters reducer
const filtersDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
}

const filtersReducer = (state = filtersDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {     //returns new object (you dont want to change actual state)
        ...state,  //gets all existing data 
        text: action.text  //overides text feild with new data
      }
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: 'date'
      }
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: 'amount'
      }
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate
      }
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate
      }

    default:
      return state
  }
}

export default filtersReducer