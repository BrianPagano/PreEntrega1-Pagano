const express = require('express')
const router = require('./router/router')
const app = express()

const port = 8080

app.use(express.json())

router(app)

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
  })