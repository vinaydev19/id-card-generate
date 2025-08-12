import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import IDCardGenerator from './IDCardGenerator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <IDCardGenerator />
    </>
  )
}

export default App
