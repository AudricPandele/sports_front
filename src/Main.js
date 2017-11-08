import React from 'react'
import { Switch, Route} from 'react-router-dom'
import Home from './Home.js'
import Auth from './auth/Auth.js'
import Login from './auth/Login.js'
import Registration from './auth/registration.js'
import Logout from './auth/Logout.js'
import Eventdetail from './event/event_detail.js'
import Account from './account/Account.js'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Auth}/>
      <Route path='/home' component={Home}/>
      <Route path = '/login' component={Login}/>
      <Route path = '/signup' component={Registration}/>
      <Route path = '/logout' component={Logout}/>
      <Route path = '/event/:id' component={Eventdetail}/>
      <Route path = '/account/:id' component={Account}/>
    </Switch>
  </main>
)

export default Main
