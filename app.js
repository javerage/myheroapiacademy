import express from 'express'
import cors from 'cors'

import heroController from './controllers/heroController.js'
import authController from './controllers/authController.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', heroController)
app.use('/api', authController)

const PORT = 3001
app.listen(PORT, _ => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})