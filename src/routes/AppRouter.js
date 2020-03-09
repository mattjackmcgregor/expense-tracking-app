import React from 'react'
import {BrowserRouter, Route, Switch,} from 'react-router-dom'
import ExpenseDashboard from '../components/ExpenseDashboard'
import AddExpense from '../components/AddExpense'
import EditExpense from '../components/EditExpense'
import HelpPage from '../components/HelpPage'
import NotFound from '../components/NotFound'
import Header from '../components/Header'

const AppRouter = () => (
  <BrowserRouter>
  <Header />
  <Switch>
    <Route path='/' component={ExpenseDashboard} exact={true} />
    <Route path='/create' component={AddExpense} />
    <Route path='/edit/:id' component={EditExpense} />
    <Route path='/help' component={HelpPage} />
    <Route component={NotFound} />
  </Switch>
  </BrowserRouter>
)

export default AppRouter