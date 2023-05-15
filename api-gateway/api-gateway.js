const app = require('express')();
const dotenv = require("dotenv")
const proxy = require('express-http-proxy')
const cors = require('cors')
dotenv.config()


const port = process.env.PORT || 3010
app.use(cors())

app.use('/commercial', proxy('http://localhost:3011'))
app.use('/risk-management', proxy('http://localhost:3013'))

app.listen(port, () => {
    console.log(`API Gateway is listening on port ${port}`)
})