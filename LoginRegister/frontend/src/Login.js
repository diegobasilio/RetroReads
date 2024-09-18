import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation'
import axios from 'axios'

function Login() {
  
  const [values, setValues] = useState({
    user_email: '',
    user_pwd: ''
  })
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    debugger;
    if(errors.user_email === "" && errors.user_pwd === ""){
      axios.post('http://localhost:3000/Login', values)
      .then(res => {
        if(res.data === "Sucesso!") {
          navigate('/');
        }else{
          alert("Conta não existente");
        }
      })
      .catch(err => console.log(err));
    }
  }
  
  return (
    <div className='container' id='container'>
      <div className='form-container signin'>
      <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-field'>
            <label htmlFor="email">E-mail:</label>
            <input type="email" id='login-email' placeholder="Digite seu e-mail" name='user_email' onChange={handleInput}/>
            {errors.user_email && <span className='text-danger'>{errors.user_email}</span>}
          </div>

          <div className='form-field'>
            <label htmlFor="password">Senha:</label>
            <input type="password" id='login-password' placeholder="Digite sua senha" name='user_pwd' onChange={handleInput}/>
            {errors.user_pwd && <span className='text-danger'>{errors.user_pwd}</span>} 
          </div>

            <button type='submit' className='btn btn-sucess' id='btn btn-sucess'>Entrar</button>
            <p>Não tem uma conta?</p>
            <Link to='/signup' className='btn btn-default'>Criar Conta</Link>
        </form>
      </div>
    </div>
  )
}

export default Login;
