const express = require('express');
const fs = require('fs');

// creo una app de tipo express
const app = express();

const PORT = process.env.PORT || 8080


app.get("/",(request, response)=>{
    response.send('<h1>estoy en heroku<h1>')
})

app.get('/productos', (request, response) => {
    
    const data = fs.readFileSync(`./productos.txt`, 'utf-8');
    const arrayProductos = JSON.parse(data);
    response.json({
        items: arrayProductos,
        cantidad: arrayProductos.length
    });
});

app.get('/productos-random', (request, response) => {
    
    const data = fs.readFileSync(`./productos.txt`, 'utf-8');
    const arrayProductos = JSON.parse(data);
    //uso match.floor como la otra vez que lo pedimos
    let numeroAleatorio = Math.floor(Math.random() * arrayProductos.length)
    console.log(numeroAleatorio)
    let producto = arrayProductos[numeroAleatorio];
    response.json({ item: producto });
});




const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});
server.on('error',error => console.log("error on server", error))