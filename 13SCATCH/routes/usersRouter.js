const express = require("express");
const router = express.Router();

router.get("/",function(req,res){
    res.send("hey Users Routes Working Grate .");
});

module.exports = router;