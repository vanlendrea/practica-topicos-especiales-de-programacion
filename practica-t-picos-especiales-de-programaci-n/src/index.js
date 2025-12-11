import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User } from './user.js'

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()
const connectDB = () => {
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
  } = process.env
  const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

  mongoose.connect(url).then(function () {
    console.log('MongoDB is connected')
  })
  .catch(function (err) {
    console.log(err)
  })
}
const port = 3005
app.use(cors({ origin: '*' })) // cors
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))

app.listen(port, function () {
    connectDB()
    console.log(`Api corriendo en http://localhost:${port}!`)
})
app.get('/', (req, res) => {
    res.get('Mi primer endpoint')
           res.status(200).send('Hola la API está funcionando correctamente');
});       

app.post('/', async (req, res) => {
    try {
        var data = req.body
        
        var newUser = new User(data)

        await newUser.save()
        res.status(200).send({
            success: true,
            message: "Se registró el usuario",
            outcome: []
        })
    }
    catch (err) {
        // Mensaje de error por si no se pudo registrar el usuario
        res.status(400).send({
            success: false,
            message: "Error al intentar crear el usuario, por favor intente nuevamente",
            outcome: []
        })
    }
})

app.get('/usuarios', async (req, res) => {
    try {
        var usuarios = await User.find().exec()

        res.status(200).send({
            success: true,
            message: "Se encontraron los usuarios exitosamente",
            outcome: [usuarios]
        })
    }
    catch (err) {
        res.status(400).send({
            success: false,
            message: "Error al intentar obtener los usuarios, por favor intente nuevamente",
            outcome: []
        })
    }
})