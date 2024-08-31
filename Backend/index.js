const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')
const path = require('path');


connectToMongo();
const app = express()
app.use(cors())
const port = 5000

app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/agreement',require('./routes/Agreement.js'))
app.use('/api/profile',require('./routes/Profile.js'))
app.use('/api/product',require('./routes/Product.js'))

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`)
})