import React from 'react'
import { Switch, Route} from 'react-router-dom'
import Home from './Home.js'
import Auth from './auth/Auth.js'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Auth}/>
      <Route path='/home' component={Home}/>
    </Switch>
  </main>
)

export default Main
