import express from 'express'

import database from './src/db/database.js'
import './src/models/associations.js'
import router from './src/routes/router.js'

await database.sync()

const app = express()

app.use(express.json())
app.use(router)

app.listen(3000, () => {
    console.log('O servidor está escutando na porta 3000.')
})