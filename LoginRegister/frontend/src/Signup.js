import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios'

function Signup() {
  const [values, setValues] = useState({
    user_nm: '',
    user_email: '',
    user_pwd: '',
    user_cn: '',
    user_fn: '',
    ende_log: '',
    ende_num: '',
    ende_comp: '',
    ende_brr: '',
    ende_cep: '',
    ende_uf: '',
    ende_cida: ''
  })
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if(errors.user_tp === "" && errors.user_nm === "" && errors.user_email === "" && errors.user_pwd === "" && errors.user_cn === "" && errors.user_fn === "" && errors.ende_log === "" && errors.ende_num === "" && errors.ende_comp === "" && errors.ende_brr === "" && errors.ende_cep === "" && errors.ende_uf === "" && errors.ende_cida === ""){
      axios.post('http://localhost:3000/signup', values)
      .then(res => {
          navigate('/Login');
      })
      .catch(err => console.log(err));
    }
  }

    return (
      <div className='container' id='container'>
        <div className='form-container signup'>
            <h1>Criar uma conta</h1>
          <form onSubmit={handleSubmit}>

            {/* Campo TIPO DE USUÁRIO */}

            <div className='form-field'>
              <label htmlFor="user_tp">Tipo de usuário:</label>
              <select name="user_tp" id="signup-user_tp" onChange={handleInput}>
                <option value="0">CPF</option>
                <option value="1">CNPJ</option>
              </select>
            </div>

            {/* Campo NOME */}

            <div className='form-field'>
                <label htmlFor="user_nm">Nome:</label>
                <input type="text" id='signup-user_nm' name='user_nm' onChange={handleInput}/>
                {errors.user_nm && <span className='text-danger'>{errors.user_nm}</span>}
            </div>

            {/* Campo CPF/CNPJ */}

            <div className='form-field'>
                <label htmlFor="user_cn">CPF/CNPJ:</label>
                <input type="text" id='signup-user_cn' name='user_cn' onChange={handleInput}/>
                {errors.user_cn && <span className='text-danger'>{errors.user_cn}</span>}
            </div>

            {/* Campo TELEFONE */}

            <div className='form-field'>
                <label htmlFor="user_fn">Tel./Celular:</label>
                <input type="tel" id='signup-user_fn' name='user_fn' onChange={handleInput}/>
                {errors.user_fn && <span className='text-danger'>{errors.user_fn}</span>}
            </div>

            {/* Campo EMAIL */}

            <div className='form-field'>
              <label htmlFor="user_email">E-mail:</label>
              <input type="email" id='signup-user_email' name='user_email' onChange={handleInput}/>
              {errors.user_email && <span className='text-danger'>{errors.user_email}</span>}
            </div>

            {/* Campo SENHA */}

            <div className='form-field'>
              <label htmlFor="user_pwd">Senha:</label>
              <input type="password" id='signup-user_pwd' name='user_pwd' onChange={handleInput}/>
              {errors.user_pwd && <span className='text-danger'>{errors.user_pwd}</span>}
            </div>

            <div className='form-field'>
              <label htmlFor="ende_log">Endereço:</label>
              
              {/* Campo LOGRADOURO */}

              <input type="text" id='signup-ende_log' placeholder="Logradouro" name='ende_log' onChange={handleInput}/>
              {errors.ende_log && <span className='text-danger'>{errors.ende_log}</span>}

              {/* Campo NÚMERO */}

              <input type="text" id='signup-ende_num' placeholder="Número (opcional)" name='ende_num' onChange={handleInput}/>
              {errors.ende_num && <span className='text-danger'>{errors.ende_num}</span>}

              {/* Campo COMPLEMENTO */}

              <input type="text" id='signup-ende_comp' placeholder="Complemento (opcional)" name='ende_comp' onChange={handleInput}/>
              {errors.ende_comp && <span className='text-danger'>{errors.ende_comp}</span>}

              {/* Campo BAIRRO */}

              <input type="text" id='signup-ende_brr' placeholder="Bairro" name='ende_brr' onChange={handleInput} />
              {errors.ende_brr && <span className='text-danger'>{errors.ende_brr}</span>}

              {/* Campo CEP */}

              <input type="text" id='signup-ende_cep' placeholder="CEP" name='ende_cep' onChange={handleInput} />
              {errors.ende_cep && <span className='text-danger'>{errors.ende_cep}</span>}

              {/* Campo ESTADO */}

              <input type="text" id='signup-ende_uf' placeholder="Estado" name='ende_uf' onChange={handleInput} />
              {errors.ende_uf && <span className='text-danger'>{errors.ende_uf}</span>}
              
              {/* Campo CIDADE */}

              <input type="text" id='signup-ende_cida' placeholder="Cidade" name='ende_cida' onChange={handleInput} />
              {errors.ende_cida && <span className='text-danger'>{errors.ende_cida}</span>}
            </div>

            <button type='submit' className='btn btn-sucess' id='btn btn-sucess'>Cadastrar</button>
            <Link to='/home'></Link>
          </form>
        </div>
      </div>
    )
  }
  
  export default Signup