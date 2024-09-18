function Validation(values){
   let error = {}

    // Padrões para validação
   const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/; 

   // Validação do e-mail
   if(values.email === ""){
        error.email = "Insira seu e-mail"
   }
   else if(!email_pattern.test(values.email)){
        error.email = "Digite um e-mail válido";
   }

   // Validação da senha
   if(values.password === ""){
        error.password = "Insira sua senha"
   }else if(!password_pattern.test(values.password)){
        error.password = "A senha está incorreta"
   }
   return error;
}

export default Validation;