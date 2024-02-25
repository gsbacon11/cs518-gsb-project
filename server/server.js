const express = require("express");
const app = express();
const port = 8080;
const bodyparser = require("body-parser");
const cors = require("cors");

app.use(bodyparser.json());
app.use(cors({
    origin:"http://localhost:3000"
}));

// Routes
app.use('/user', require('./routes/user'));
app.use('/login', require('./routes/login'));
app.use('/signup', require('./routes/signup'));

app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`)
});

app.get("/", (req,res) => {
    res.send(" api")
});
