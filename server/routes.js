const express =  require('express');
const routes = express.Router()

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