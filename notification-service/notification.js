const app = require('express')();
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 3004;

app.use('/', (req,res) => {
    res.status(200).json({"msg": "Notification Service works"})
})

app.listen(port, () => {
    console.log(`Notifcation app is listening on port ${port}`)
})