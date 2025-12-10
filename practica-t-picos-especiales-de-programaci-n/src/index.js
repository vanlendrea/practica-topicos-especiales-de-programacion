import express from 'express'
import cors from 'cors'
import dotenv from "dotenv "
import mongoose from ' mongoose '

const app = express()
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
    res.get('Mi primer endpoint con Express.js')
           res.status(200).send('Hola la API está funcionando correctamente');
});       