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


customerSearchSection.style.display = 'none';

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
                                Swal.fire({
                                    title:"Access Granted",
                                    text:'You are available to use CVP APP',
                                    icon: 'success'
                                })
                                authSection.style.display = 'none'
                                customerSearchSection.style.display = 'block';

                            }else if(message.message == 'Denied'){
                                Swal.fire({
                                    title:"Access Denied",
                                    icon: 'error'
                                })
                            }else if(message.message == "user not found"){
                                Swal.fire({
                                    title:"user not found",
                                    icon: 'error'
                                })
                            }
                            
                        })
                }
            })
    }else{ 
        Swal.fire({
            title:"Some Empty Fields",
            text:'Enter all the fields',
            icon: 'warning'
        })
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
                               
                                Swal.fire({
                                    title:`Customer ${respuesta[0].name}`,
                                    text:'Aailable customer',
                                    icon: 'success'
                                })
                                idStr.innerHTML =respuesta[0].clientId
                                nameStr.innerHTML =respuesta[0].name
                                identificationStr.innerHTML =respuesta[0].identification
                                nContracts.innerHTML =respuesta[0].numberOfContracts
                            }else{
                                
                                Swal.fire({
                                    title:"Customer Not Found",
                                    icon: 'error'
                                })
                            }
                            
                        })
                }
            })
        }
        else{
            alert("Enter an identification")
        }
}