const express = require('express')
const mysql= require('mysql')
const bodyParser= require('body-parser');

const app = express();
const Port=4200;

const connection= mysql.createConnection({
    user:'root',
    database:'restaurant',
    password:''
})

connection.connect(()=> console.log('database connecting'))
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.json())
app.set('view engine','ejs')


app.get('/',(req,res)=>{

    connection.query('SELECT * FROM pizza',(err,dataPizza)=>{
        if(err){
            throw err
        }else{
            //console.log(dataPizza)
            res.render('index',{dataPizza})
        }
    })
    
})


app.get('/order/:id',(req,res)=>{
    let idPizza=req.params.id;
    connection.query('SELECT * FROM pizza WHERE id=?',[idPizza],(error,dataPizzaSelected)=>{
        if(error){
            throw error
        }else{
            let pizzaSelected= dataPizzaSelected[0];

            connection.query('SELECT * FROM ingredient',(errorIng,  dataIng)=>{
                if(errorIng){
                    throw errorIng
                }else{
                    
                    res.render('order',{pizzaSelected,dataIng})
                }
            })

            
        }
    })

   
})


app.post('/saveOrder',(req,res)=>{

    let orderData= JSON.stringify(req.body);
    
    connection.query('INSERT INTO commande (`order`) VALUES(?)',[orderData])
    res.send('succes')
})

app.listen(Port,()=> console.log('server run on port '+ Port))