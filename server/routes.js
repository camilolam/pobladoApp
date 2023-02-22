const express =  require('express');
const routes = express.Router()

routes.post('/validation',(req,res)=>{
    console.log(req.body)
    let usernameReq = req.body.username
    let passwordReq = req.body.password
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
        var queryStr = `SELECT * FROM auth_confirm where username = '${usernameReq}'`
        conn.query(queryStr,(err,rows)=>{
            if(err) return res.send(err);
            if(rows.length!=0){
                if(passwordReq==rows[0].password){
                    res.json({ message:"Accepted"}) 
                }else{
                    res.json({ message:"Access Denied" }) 
                }
            }
            else{
                res.json({message:"user not exits"}) 
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

module.exports = routes