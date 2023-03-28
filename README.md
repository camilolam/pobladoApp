# pobladoApp
Este repositorio para empezar a desarrolla la aplicaciónp para el manejo de la información de la Compravente el Poblado. 

Esta aplicación permite: 
* Generar nuevos clientes
*Generar nue vos contratos relacionados con los clientes
* retirar los contratos
* renovar los contratos
* agregar valores adicionales a los contratos
* realizar abonos al capital de los contratos
* permite ingresar movimiento adicionales, limosnas, pagos, aportes, etc
* Si se requiere, tomar fotos de los objetos. 

Se desera desarrollar esta aplicación con diseños minimalistas, buscando siempre la comodidad a la hora de ver la información. 

Para ejecutar el servidor a nivel local, es necesario crear un nuevo proyecto con node (npm init). Posterior a esto se deben instalar las siguientes extensiones. 

* express
* mysql 
* path 
* expres-myconnection
* cors

Cada una se intala con el comando npm install "nombre extension"

Se instala nodemon para reiniciar el servidor una vez se haga un cambio en el código del mismo. 
En el package.json, en el apartado script se introduce la siguiente sentencia

"dev": "nodemon index.js"

Y para correr el servdor se hacer uso de la sentencia "npm run dev"


---------  

Se ha organizado una carpeta para crear el servidor de la aplicación pero con python y django. Es necesario saber que se necesita un entorno virtual para trabajar de forma adecuada para cada proyecto, es por esto que en el siguiente link, puedes aprender como crear entornos virtuales según sea tu sistema operativo

https://docs.python.org/es/3/tutorial/venv.html

Estas son las librerías que se deben intstalar para crear el servidor con python, hay que tener activado el entorno virtual e instalarlos dentro del mismo

pip install "nombre paquete"

* Django
* pymysql -> manejo de bases de datos
