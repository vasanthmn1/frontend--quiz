import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './layout/Layout'
import { BrowserRouter } from 'react-router-dom'

function App() {


  return (
    <div>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>

    </div>
  )
}

export default App
