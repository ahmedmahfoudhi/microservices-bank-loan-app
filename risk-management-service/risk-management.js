const app = require('express')();
const dotenv = require('dotenv')
const cors = require('cors');
dotenv.config()

app.use(cors())


app.use('/final-score', (req,res) => {
    const finalScore = Math.random();
    res.status(200).json({"score": finalScore})
})

const port = process.env.PORT || 3013;
app.listen(port, () => {
    console.log(`Risk Management app is listening on port ${port}`)
})