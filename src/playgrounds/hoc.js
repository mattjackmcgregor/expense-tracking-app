//higher order components (HOC)- a component (HOC) that renders another component
//reuse code
//render hijacking
//prop manipulation
//abstract state

import React from 'react'
import ReactDOM from 'react-dom'

//regular functional omponent with props passed in
const Info = (props) => (
  <div>
    <p>this is the info: {props.info}</p>
  </div>
)

//HOC function that that takes in the wrapped component and returns the new structure {...props} <=== passing props to the wrapper component
const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>this is private stuff, dont share!</p>} 
      <WrappedComponent {...props}/> 
    </div>
  )
}

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? (
         <WrappedComponent {...props} />
        ) : (
         <p>plesae login to see info</p>
        )}
      
    </div>
  )
}

const AuthInfo = requireAuthentication(Info)
const AdminInfo = withAdminWarning(Info) //setting the final HOC component to the function that generates it. notice the captial A on AdminInfo

ReactDOM.render(<AuthInfo isAuthenticated={true} info='private deatail here' />, document.getElementById('app'))
