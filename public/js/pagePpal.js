// inners html
const idStr = document.querySelector('#customerId');
const nameStr = document.querySelector('#name');
const identificationStr = document.querySelector('#identification');
const nContracts= document.querySelector('#numberOfContracts');


// buttons
const btn_read = document.querySelector('#btn_read');
const btn_auth = document.querySelector('#btn_auth');

//vars
const identStr = document.querySelector('#ident');
const usernameStr = document.querySelector('#username_auth');
const passwordStr = document.querySelector('#password_auth')

//sections 
const customerSearchSection = document.querySelector('.customer_read');
const authSection = document.querySelector('.auth_section');



btn_read.addEventListener('click',readCustomers);
btn_auth.addEventListener('click', userValidation);


//customerSearchSection.style.display = 'none';

function userValidation(){
    console.log(usernameStr.value)
    console.log(passwordStr.value)
    if(usernameStr.value != "" && passwordStr.value != ""){
        console.log(usernameStr.value)
        fetch(`http://192.168.0.117:9000/validation`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:usernameStr.value, //notacion que js entiende que el valor se llama igual que la propiedad
                password:passwordStr.value
            })
        })
            .then(function(res){
                if(res.ok){
                    res.json()
                        .then(function(message){
                            console.log(message)
                            if(message.message == "Accepted"){
                                alert('Welcome to CVP App')
                                //authSection.style.display = 'none'
                                //customerSearchSection.style.display = 'block';

                            }else{
                                alert('User not found')
                            }
                        })
                }
            })
    }else{ 
        alert("Some Empty Field")
    }
}

function readCustomers(){
    
    console.log(identStr.value)
    if(identStr.value != ""){
        fetch( `http://192.168.0.117:9000/readCustomers/${identStr.value}`) // hace una petición get por defecto, si es necesario se le debe decir cuando es post
            .then(function(res){
                if(res.ok){
                    res.json()
                        .then(function (respuesta){
                            console.log(respuesta)
                            console.log(respuesta.length)
                            if(respuesta.length != 0){
                                alert(`Hi ${respuesta[0].name}`)
                                idStr.innerHTML =respuesta[0].clientId
                                nameStr.innerHTML =respuesta[0].name
                                identificationStr.innerHTML =respuesta[0].identification
                                nContracts.innerHTML =respuesta[0].numberOfContracts
                            }else{
                                alert('Customer not found')
                            }
                            
                        })
                }
            })
        }
        else{
            alert("Enter an identification")
        }
}