import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Presentation } from './components/presentation/Presentation'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Presentation />
    </BrowserRouter>
  )
}

export default App
