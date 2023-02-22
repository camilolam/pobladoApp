alert("Welcome to CVP")
const idStr = document.querySelector('#customerId');
const nameStr = document.querySelector('#name');
const identificationStr = document.querySelector('#identification');
const nContracts= document.querySelector('#numberOfContracts');
const btn_read = document.querySelector('#btn_read')
const identStr = document.querySelector('#ident')

btn_read.addEventListener('click',readCustomers);

function readCustomers(){
    console.log("perros llegue hasta aqui ")
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
                                idStr.innerHTML+=respuesta[0].clientId
                                nameStr.innerHTML+=respuesta[0].name
                                identificationStr.innerHTML+=respuesta[0].identification
                                nContracts.innerHTML+=respuesta[0].numberOfContracts
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