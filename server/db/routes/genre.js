const express = require("express");

// create an express router
const router = express.Router();

// export router
module.exports = router;

// GET /genre
// respond with HTML text to be rendered by the browser that will show a form
router.get("/", (req, res) => {
    res.send('pretend this is a form')
})

// POST /genre
router.post("/", (req, res) => {
    console.log(req.body);
    res.send('pretend this does something')
})