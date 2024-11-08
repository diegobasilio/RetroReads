import Validation from '../Validations/loginValidation';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login/login.css';
import '../css/global.css';

function Login() {
  const [values, setValues] = useState({
    user_email: '',
    user_pwd: ''
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();

    // Realiza a validação e armazena os erros
    const validationErrors = Validation(values);
    setErrors(validationErrors);

  // Se não houver erros de validação, faz a requisição POST
  if (!validationErrors.user_email && !validationErrors.user_pwd) {
    axios.post('http://localhost:8081/login', values)
      .then(res => {
        if (res.data.token) { // Verifica se o token foi retornado
          // Armazena o token no localStorage para manter a sessão
          localStorage.setItem("token", res.data.token);
          navigate('/'); // Redireciona para a página inicial
        } else {
          alert("Conta não existente ou dados incorretos.");
        }
      })
      .catch(err => {
        console.error("Erro no login:", err);
        alert("Erro ao tentar fazer login.");
      });
  } else {
    console.log("Erros de validação: ", validationErrors);
  }
};
  
  return (
    <div className='container' id='container'>
      <div className='titleAndSignup'>
        <h1 className='h1-title'>Login</h1>
        <Link to='/signup' className='btn-default'>Ainda não tenho conta ➔</Link>
      </div>

      <div className='form-container-login'>

        <form onSubmit={handleSubmit} >
        <h1 className='h1-subTitle'>Dados da conta</h1>
          <div className='form-field'>
            <label htmlFor="user_email">E-mail:</label>
            <input type="email" id='login-user_email' placeholder="Digite seu e-mail" name='user_email' onChange={handleInput}/>
            {errors.user_email && <span className='text-danger'>{errors.user_email}</span>}
          </div>

          <div className='form-field'>
            <label htmlFor="user_pwd">Senha:</label>
            <input type="password" id='login-user_pwd' placeholder="Digite sua senha" name='user_pwd' onChange={handleInput}/>
            {errors.user_pwd && <span className='text-danger'>{errors.user_pwd}</span>} 
          </div>

            <button type='submit' className='btn-Success'>Realizar login</button>
        </form>

      </div>
    </div>
  )
}

export default Login;
