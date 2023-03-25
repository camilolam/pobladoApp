const express =  require('express');
const routes = express.Router()
const bcrypt = require("bcryptjs"); // encriptar contraseñas

routes.post('/validation',(req,res)=>{
    //console.log(req.body)
    let usernameReq = req.body.username
    let passwordReq = req.body.password
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
        conn.query(`SELECT * FROM auth_confirm where username = '${usernameReq}'`,(err,rows)=>{
            if(err) return res.send(err);
            if(rows.length!=0){
                bcrypt.compare(passwordReq, rows[0].password, (err, coinciden) => {
                    if (err) {
                        
                        console.log("Error comprobando:", err);
                    } else {
                        console.log("¿La contraseña coincide?: " + coinciden);
                        if(coinciden){
                            conn.query(`INSERT INTO active set username = '${usernameReq}'`);
                            res.json({
                                 message:"Accepted",
                                 username:usernameReq
                                }) 
                        }else{
                            res.json({ message:"Denied" }) 
                        }
                    }
                });
            }
            else{
                res.json({message:"user not found"}) 
            }         
        });
     });
});

routes.get('/readCustomers/:ident',(req,res)=>{
    let ident = req.params.ident
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
        var queryStr = `SELECT * FROM clients where identification = '${ident}'`
        conn.query(queryStr,(err,rows)=>{
            if(err) return res.send(err);
            console.log(rows);
            console.log(rows.length)
            res.json(rows)          
        });
     });
});

routes.get('/validateActive',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
        conn.query('SELECT * FROM active',(err,active)=>{
            if(err) return res.send(err)
            if(active.length!=0){
                console.log(active[0])
                res.json({
                    state:true,
                    username:active[0].username
                })
            }else{
                res.json({
                    state:false
                })
            }
        })
    })
});

routes.get('/closeSesion',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
        conn.query('TRUNCATE active');
        res.json({
            res:"sesion closed"
        });
    });
});


module.exports = routes