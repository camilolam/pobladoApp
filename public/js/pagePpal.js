// inners html
const idStr = document.querySelector('#customerId');
const nameStr = document.querySelector('#name');
const identificationStr = document.querySelector('#identification');
const nContracts= document.querySelector('#numberOfContracts');
const asideMenu = document.querySelector('#aside_menu');
const username_head = document.querySelector('#username_head');

// buttons
const btn_read = document.querySelector('#btn_read');
const btn_auth = document.querySelector('#btn_auth');
const btn_menu_responsive = document.querySelector('#btn_menu');
const btn_customers = document.querySelector('#btn_customers');
const btn_contracts = document.querySelector('#btn_contracts');
const btn_employs = document.querySelector('#btn_employs');
const btn_payments = document.querySelector('#btn_payments');
const btn_contributions = document.querySelector('#btn_contributions');
const btn_additional_movements = document.querySelector('#btn_additional_movements');
const btn_close_session = document.querySelector('#btn_close_session');

//vars
const identStr = document.querySelector('#ident');
const usernameStr = document.querySelector('#username_auth');
const passwordStr = document.querySelector('#password_auth');

//sections 
const customerSearchSection = document.querySelector('.customer_read');
const authSection = document.querySelector('.auth_section');

// program vars
let menuFlag = false;
const apiUrl = "http://192.168.0.117:9000"


btn_read.addEventListener('click',readCustomers);
btn_auth.addEventListener('click', userValidation);


btn_close_session.addEventListener('click',()=>{
    cleanButton()
    btn_close_session.classList.add('active')
})

btn_customers.addEventListener('click',()=>{
    cleanButton()
    btn_customers.classList.add('active')
});

btn_contracts.addEventListener('click',()=>{
    cleanButton()
    btn_contracts.classList.add('active')
});

btn_employs.addEventListener('click',()=>{
    cleanButton()
    btn_employs.classList.add('active')
});
btn_payments.addEventListener('click',()=>{
    cleanButton()
    btn_payments.classList.add('active')
});
btn_contributions.addEventListener('click',()=>{
    cleanButton()
    btn_contributions.classList.add('active')
});
btn_additional_movements.addEventListener('click',()=>{
    cleanButton()
    btn_additional_movements.classList.add('active')
});

btn_menu_responsive.addEventListener('click',()=>{
    if(menuFlag == false){
        asideMenu.style.display = 'block';
        menuFlag = true;
    }else{
        asideMenu.style.display = 'none';
        menuFlag = false;
    }
    
});


fetch( `${apiUrl}/validateActive`) // hace una petición get por defecto, si es necesario se le debe decir cuando es post
            .then(function(res){
                if(res.ok){
                    res.json()
                        .then(function (active){
                            console.log(active)
                            if(active.state){
                                console.log('hay una sesion activa')
                                authSection.style.display = 'none'
                                username_head.innerHTML = active.username
                            }
                            else{
                                customerSearchSection.style.display = 'none';
                                asideMenu.style.display = 'none';       
                            }
                        })
                }
            })

function cleanButton(){
    btn_customers.classList.remove('active')
    btn_contracts.classList.remove('active')
    btn_employs.classList.remove('active')
    btn_payments.classList.remove('active')
    btn_contributions.classList.remove('active')
    btn_additional_movements.classList.remove('active')
}

function userValidation(){
    console.log(usernameStr.value)
    console.log(passwordStr.value)
    if(usernameStr.value != "" && passwordStr.value != ""){
        console.log(usernameStr.value)
        fetch(`${apiUrl}/validation`,{
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
                                username_head.innerHTML = message.username
                                authSection.style.display = 'none'
                                customerSearchSection.style.display = 'block';
                                asideMenu.style.display = 'block';

                            }else if(message.message == 'Denied'){
                                Swal.fire({
                                    title:"Access Denied",
                                    icon: 'error'
                                })
                            }else if(message.message == "user not found"){
                                Swal.fire({
                                    title:"User Not Found",
                                    icon: 'error'
                                })
                            }
                            
                        })
                }
            })
    }else{ 
        Swal.fire({
            title:"Some Empty Fields",
            text:'Enter all Fields',
            icon: 'warning'
        })
    }
}

function readCustomers(){
    
    console.log(identStr.value)
    idStr.innerHTML =""
    nameStr.innerHTML =""
    identificationStr.innerHTML =""
    nContracts.innerHTML =""
    if(identStr.value != ""){
        fetch( `${apiUrl}/readCustomers/${identStr.value}`) // hace una petición get por defecto, si es necesario se le debe decir cuando es post
            .then(function(res){
                if(res.ok){
                    res.json()
                        .then(function (respuesta){
                            console.log(respuesta)
                            console.log(respuesta.length)
                            if(respuesta.length != 0){
                               
                                Swal.fire({
                                    title:`Customer ${respuesta[0].name}`,
                                    text:'Available Customer',
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