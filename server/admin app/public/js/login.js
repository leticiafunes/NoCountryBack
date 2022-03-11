function login (e) {
     
    const email=  document.getElementById("email").value;
    const password=  document.getElementById("password").value;

    console.log (email);

    const Url = 'https://ligabasketbackend.herokuapp.com/api/users/login'; 
    
    const usuario= {
        email: email,
        password: password
    }
   
 
    axios.post('https://ligabasketbackend.herokuapp.com/api/users/login', usuario) 
   
    .then (response => {
          if (response.data.user_token) {
            localStorage.setItem("user_token", response.data.user_token);
            //localStorage.getItem("user_token") para buscarlo
            //localStorage.removeItem( "user_token" ); para borrar
            //window.location.href = "https://professor-falken.com";
            document.location.href = '/'
          } 
          else {
            alert ('Email o password incorrectos')
          }

      })
      .catch (error => console.log (error))

   
}

