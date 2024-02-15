const express = require("express");
const app = express();
const port = 8080;

// Routes
app.use('/user', require('./routes/user'));

app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`)
});

app.get("/", (req,res) => {
    res.send(" api")
});
