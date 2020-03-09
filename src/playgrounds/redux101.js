import {createStore} from 'redux'


//action generators
const incrementCount = ({incrementBy = 1} = {}) =>({
  type: 'INCREMENT',
  incrementBy
})

//destructuring the data, if decrement by not given, it will default to 1, and setting a default object if there is no data 
const decrementCount = ({decrementBy = 1} = {}) => ({ 
  type: 'DECREMENT',
  decrementBy
})
  
const setCount = ({count} = {}) => ({
  type: 'SET',
  count
})

const resetCount = () => ({
  type: 'RESET'
})

const incrementByFive = () => ({
  type: 'INCREMENTBYFIVE'
})

//reducers are pure functions, 9dont rely on anything ouside its block scope
// Reducer
const countReducer = (state={count: 0}, action) => {
  //case scenario for when each type is called of what to do
  switch (action.type) {
    case "INCREMENTBYFIVE" :
      return {
        count: state.count + 5
      }
    case 'INCREMENT':
      return {

        count: state.count + action.incrementBy
      }
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      }
    case 'SET':
      return {
        count: action.count
      }
    case 'RESET':
      return {
        count: 0
      }
    default:
      return state
  }
}
//creating store and setting the initial state
const store = createStore(countReducer)

//subscribes store to every action dispatch
store.subscribe(() => {
  console.log(store.getState())
})

//calling actions

//inline action object
// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 5
// })

//unsubscribe()

store.dispatch(incrementCount())

store.dispatch(incrementCount({incrementBy: 5}))

store.dispatch(decrementCount({decrementBy: 20}))

store.dispatch(setCount({count: 8}))

store.dispatch(resetCount())

store.dispatch(incrementByFive())



