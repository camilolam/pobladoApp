const express =  require('express');
const routes = express.Router()

routes.get('/readCustomers',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
        var queryStr = `SELECT * FROM clients`
        conn.query(queryStr,(err,rows)=>{
            if(err) return res.send(err);
            console.log(rows);
            //if(rows.lenght !=0){
            res.json(rows);
                /*}else{
                    res.json({
                        msg:"Customer not found"
                    })
                }*/
                
        });
     });

});

module.exports = routes