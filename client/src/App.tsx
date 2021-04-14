import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar isAuth={false} />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          {/* <Route path="/favorite" component={About} /> */}
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
