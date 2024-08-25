import React from 'react'
import Login from './Login'
import {BrowserRouter, Route, Route} from 'react-router-dom'
import Signup from './Signup'


function App() {
  return (
    <BrowserRouter>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Login />}></Route>
        <Route path="/home" element={<Login />}></Route>
    </BrowserRouter>
  )
}

export default App