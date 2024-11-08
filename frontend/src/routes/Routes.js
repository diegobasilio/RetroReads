import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import MyShelf from '../pages/MyShelf'
import BookRegister from '../pages/BookRegister'

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book-register" element={<BookRegister />} />
        <Route path="/my-shelf" element={<MyShelf />} />
      </Routes>
    );
  };
  
  export default AppRoutes;