import React, { useEffect } from 'react';

function Cash() {

  useEffect(() => {
    if (!localStorage.getItem("token")) {
       window.location.href = 'http://localhost:3000/Login'; 
    }     
  })

  return (
    <div>TESTE</div>
  )
}

export default Cash