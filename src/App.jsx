import { useState } from 'react'

import './App.css'
import Recipes from './components/recipes/Recipes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Recipes/>
    </>
  )
}

export default App
