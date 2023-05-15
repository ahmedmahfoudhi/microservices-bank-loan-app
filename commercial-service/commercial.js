const app = require('express')();
const { default: axios } = require('axios');
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const port = process.env.PORT || 3011;

app.use(cors())


app.use('/assess', async(req,res) => {
    const initialScore = Math.random();
    try {
        console.log(initialScore)
        const response = await axios.post("http://localhost:3010/risk-management/final-score",req.body);
        if(response.data.score){
            const finalScore = initialScore + response.data.score;
            if(finalScore > 1){
                res.status(200).json({"success": true, "message": "You are eligible to get a loan"})
            }else{
                res.status(200).json({"success": false, "message": "Unfortuantely, You are not eligible to get a loan"})
            }
        }else{
            res.status(403).json({"success": false, "message": "Risk management service does not provice adapted data"})
        }
    } catch (error) {
        res.status(403).json({"success": false, "message": "Something went wrong while getting score from risk management service"})
    }
})

app.use('/', (req,res) => {
    res.status(200).json({"msg": "Commercial Service works"})
})




app.listen(port, () => {
    console.log(`Commercial app is listening on port ${port}`)
})