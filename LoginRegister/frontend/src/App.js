import React from 'react'
import Login from './Login'
<<<<<<< HEAD
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import Home from './Home'
=======
import {BrowserRouter, Route, Route} from 'react-router-dom'
import Signup from './Signup'
>>>>>>> 92612bd222c7239585509d595b45904c7a8aa3ed


function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
    </Routes>
=======
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Login />}></Route>
        <Route path="/home" element={<Login />}></Route>
>>>>>>> 92612bd222c7239585509d595b45904c7a8aa3ed
    </BrowserRouter>
  )
}

export default App