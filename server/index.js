const express = require("express");
const app = express();
// creates express application

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`server is runnong on port ${PORT}`)
})

app.get("/", (req, res) => {
    res.send("Hello :)")
})