import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { NavBar } from './components/NavBar'
import { About } from './pages/About'
import { Home } from './pages/Home'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
