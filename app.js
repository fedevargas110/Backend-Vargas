const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const mysql = require('mysql2/promise')

//const whiteList = ['https://drive.google.com/file/d/1pAYYgFQmWrSEEUNMAWHr9nfgVdOYGOkf/view?'];


app.use(cors());
var connection;

app.get('/api/products', async(req, res) => {
  const [row, fields] = await connection.execute('SELECT * FROM productos')
  console.log(row);
  res.send(row);
})

app.get('/api/variedades', async(req, res)=>{
  let id = req.query.id
  const [row, fields] = await connection.execute(`SELECT * FROM variedades INNER JOIN productos ON variedades.id_productos = productos.id WHERE productos.id = ${id}`)
  const peri = await connection.execute('SELECT * FROM variedades')
  console.log(peri)
  console.log(row);
  res.send(row);
})

app.use('/', express.static('productos.html'));


app.listen(port, async() => {
  connection = await mysql.createConnection({
    host     : 'containers-us-west-121.railway.app',
    user     : 'root',
    password : 'REgHv2teSm4F8CMXBrwW',
    port     : '7285',
    database : 'railway',
    insecureAuth : true
  });
  console.log(`Servidor UP Successfully in ${port}`)
})
