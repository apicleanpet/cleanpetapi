import express from 'express'
import cors from 'cors'
import db from './database/db.js'
import bodyParser from 'body-parser';
import { config } from 'dotenv';
config();

import productRouter from './routes/productRouter.js'

const app = express()

app.use(cors({
    origin: [
      'http://localhost:3000',
      'https://cleanpetrosario.com/'
    ]
  }));
app.use(express.json())
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/products', productRouter)

try {
    await db.authenticate()
    console.log('Conexión exitosa con la base de datos')
} catch (error) {
    console.log(`El error de conexión es: ${error}`)
}

app.get('/', (req, res) => {
    res.send('Accedé a la página desde https://cleanpetrosario.com/')
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})