var express = require('express');
var mysql = require('mysql');
const path  = require('path');
const myconn = require('express-myconnection');
const routes = require('./routes')


var app = express();
app.set('port',process.env.PORT || 9000);

var dbInfo = {
    host: "www.db4free.net",
    port: 3306,
    user: "camilocanaveral",
    password: "Maria1234.",
    database:"cvp_info"
  };

app.use(express.static(path.join(__dirname,'../public')));

app.use(myconn(mysql,dbInfo,'single'));

app.use('/',routes);

app.listen(app.get('port'),function(){
console.log(`Server on Port ${app.get('port')}, listening ...`)
});






// forma de usar archivos estaticos
//
/*app.use((req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
})*/