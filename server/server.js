const express = require("express");
const app = express();
const port = 8080;
const bodyparser = require("body-parser");

app.use(bodyparser.json());

// Routes
app.use('/user', require('./routes/user'));
app.use('/login', require('./routes/login'));

app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`)
});

app.get("/", (req,res) => {
    res.send(" api")
});
