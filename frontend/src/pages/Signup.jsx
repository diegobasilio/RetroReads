import Validation from '../Validations/signupValidation';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import '../css/Signup/signup.css';
import '../css/global.css';

function Signup() {
  const [values, setValues] = useState({
    user_nm: '',
    user_email: '',
    user_fn: '',
    user_pwd: '',
    user_cn: '',
    user_tp: '',
    ende_log: '',
    ende_num: '',
    ende_comp: '',
    ende_cida: '',
    ende_uf: '',
    ende_cep: '',
    ende_brr: '',
    user_tp: '',
    user_pwd_confirm: '' //APENAS VALIDAÇÃO, NÃO ENTRA EM CONTATO COM O BANCO DE DADOS
  })

  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    console.log("Submitting form", values); // Adicionado para debug
    if (Object.keys(errors).length === 0) {
      console.log("No errors, sending POST request"); // Adicionado para debug
      // Só vai para o POST se não houver nenhum erro
      axios.post('http://localhost:8081/signup', values)
          .then(res => {
            console.log("Response from server:", res); // Adicionado para debug
              navigate('/login');
          })
          .catch(err => console.log("Error from server:",err));
    } else {
        console.log("Validation errors:", errors); // Adicionado para debug
  }
  }
  
    return (
      <div className='container' id='container'>
        <h1 className='h1-Title'>Cadastro de conta</h1>
        <div className='form-container-signup'>
          <form onSubmit={handleSubmit}>

            <div className='container-for-div'>
                {/* DIV DADOS PESSOAIS ↓ */}
              <div className='personalData'>
                <h1 className='h1-subTitle'>Dados pessoais</h1>

                {/* Campo TIPO DE USUÁRIO ↓ */}

                <div className='form-field'>
                  <label htmlFor="user_tp">Tipo de usuário:</label>
                  <select name="user_tp" id="signup-user_tp" onChange={handleInput}>
                    <option>Selecione</option>
                    <option value="1" id='1'>CPF</option>
                    <option value="2" id='2'>CNPJ</option>
                  </select>
                  {errors.user_tp && <span className='text-danger'>{errors.user_tp}</span>}
                </div>

                {/* Campo NOME ↓ */}

                <div className='form-field'>
                    <label htmlFor="user_nm">Nome:</label>
                    <input type="text" id='signup-user_nm' name='user_nm' onChange={handleInput}/>
                    {errors.user_nm && <span className='text-danger'>{errors.user_nm}</span>}
                </div>

                {/* Campo CPF/CNPJ ↓ */}

                <div className='form-field'>
                    <label htmlFor="user_cn">CPF/CNPJ:</label>
                    <input type="text" id='signup-user_cn' name='user_cn' onChange={handleInput}/>
                    {errors.user_cn && <span className='text-danger'>{errors.user_cn}</span>}
                </div>

                {/* Campo TELEFONE ↓ */}

                <div className='form-field'>
                    <label htmlFor="user_fn">Tel./Celular:</label>
                    <input type="tel" id='signup-user_fn' name='user_fn' onChange={handleInput}/>
                    {errors.user_fn && <span className='text-danger'>{errors.user_fn}</span>}
                </div>
              </div>
              
              {/* DIV DADOS DE ENDEREÇO ↓ */}
              <div className='addressData'>
                <h1 className='h1-subTitle'>Endereço</h1>

                  {/* Campo LOGRADOURO ↓ */}

                <div className='form-field'>
                  <label htmlFor="ende_log">Logradouro:</label>
                  <input type="text" id='signup-ende_log' name='ende_log' onChange={handleInput}/>
                  {errors.ende_log && <span className='text-danger'>{errors.ende_log}</span>}

                  {/* Campo NÚMERO ↓ */}

                  <label htmlFor="ende_num">Número:</label>
                  <input type="text" id='signup-ende_num' placeholder="(opcional)" name='ende_num' onChange={handleInput}/>
                  {errors.ende_num && <span className='text-danger'>{errors.ende_num}</span>}

                  {/* Campo COMPLEMENTO ↓ */}
                  
                  <label htmlFor="ende_comp">Complemento:</label>
                  <input type="text" id='signup-ende_comp' placeholder="(opcional)" name='ende_comp' onChange={handleInput}/>
                  {errors.ende_comp && <span className='text-danger'>{errors.ende_comp}</span>}

                  {/* Campo BAIRRO ↓ */}

                  <label htmlFor="ende_brr">Bairro:</label>
                  <input type="text" id='signup-ende_brr' name='ende_brr' onChange={handleInput} />
                  {errors.ende_brr && <span className='text-danger'>{errors.ende_brr}</span>}

                  {/* Campo CEP ↓ */}

                  <label htmlFor="ende_cep">CEP:</label>
                  <input type="text" id='signup-ende_cep' name='ende_cep' onChange={handleInput} />
                  {errors.ende_cep && <span className='text-danger'>{errors.ende_cep}</span>}

                  {/* Campo ESTADO ↓ */}

                  <label htmlFor="ende_uf">Estado:</label>
                  <input type="text" id='signup-ende_uf' name='ende_uf' placeholder='UF' onChange={handleInput} />
                  {errors.ende_uf && <span className='text-danger'>{errors.ende_uf}</span>}
                  
                  {/* Campo CIDADE ↓ */}

                  <label htmlFor="ende_cida">Cidade:</label>
                  <input type="text" id='signup-ende_cida' name='ende_cida' onChange={handleInput} />
                  {errors.ende_cida && <span className='text-danger'>{errors.ende_cida}</span>}
                </div>
              </div>

                {/* DIV DADOS DA CONTA ↓ */}
              <div className='accountData'>
                <h1 className='h1-subTitle'>Dados da conta</h1>

                {/* Campo EMAIL ↓ */}

                <div className='form-field'>
                  <label htmlFor="user_email">E-mail:</label>
                  <input type="email" id='signup-user_email' name='user_email' onChange={handleInput}/>
                  {errors.user_email && <span className='text-danger'>{errors.user_email}</span>}
                </div>

                {/* Campo SENHA ↓ */}

                <div className='form-field'>
                  <label htmlFor="signup-user_pwd">Senha:</label>
                  <input type="password" id='signup-user_pwd' name='user_pwd' onChange={handleInput}/>
                  {errors.user_pwd && <span className='text-danger'>{errors.user_pwd}</span>}
                </div>
                
                {/* Campo CONFIRMAR SENHA ↓ */} 

                <div className='form-field'>
                  <label htmlFor="signup-user_pwd_confirm">Confirmar a senha:</label>
                  <input type="password" id='signup-user_pwd_confirm' name='user_pwd_confirm' onChange={handleInput}/>
                  {errors.user_pwd_confirm && <span className='text-danger'>{errors.user_pwd_confirm}</span>}
                </div>
              </div>
            </div>

            <button type='submit' className='btn-successful' id='btn btn-sucess'>Cadastrar</button>
          </form>
        </div>
      </div>
    )
} 
  export default Signup