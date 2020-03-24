import React from 'react'
import {Router, Route, Switch,} from 'react-router-dom'
import ExpenseDashboard from '../components/ExpenseDashboard'
import AddExpense from '../components/AddExpense'
import EditExpense from '../components/EditExpense'
import HelpPage from '../components/HelpPage'
import NotFound from '../components/NotFound'
import Header from '../components/Header'
import LoginPage from '../components/LoginPage'
import {createBrowserHistory} from 'history'
import PrivateRoute from './PrivateRoute'


export const history = createBrowserHistory()

const AppRouter = () => (
  <Router history={history}>
  <Switch>
    <Route path='/' component={LoginPage} exact={true} />
    <PrivateRoute path='/dashboard' component={ExpenseDashboard} />
    <PrivateRoute path='/create' component={AddExpense} />
    <PrivateRoute path='/edit/:id' component={EditExpense} />
    <Route path='/help' component={HelpPage} />
    <Route component={NotFound} />
  </Switch>
  </Router>
)

export default AppRouter