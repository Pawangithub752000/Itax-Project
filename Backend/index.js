const express = require('express');
const cors = require('cors');
const { connectDB } = require('./database/index');
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());
const Notes = require("./models/notes");



app.post('/notes', (req, res) => {
    console.log(req.body);
    const user = new Notes(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    })
})


app.get('/', (req, res) => {


    Notes.find({}).then((user) => {
        res.send(user);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

app.get('/user', (req, res) => {
    // let data = await connectDB();
    let page = Number(req.query.page) || 1; 

    let limit = Number(req.query.limit) || 3;

    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);
 
    apiData.then((user) => {
        res.status(200).json({user})
    })
   
})


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
});

