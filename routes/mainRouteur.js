const express = require('express');
const router = express();

console.log("main Router");

userRoute = require('../routes/userRouteur');
homeRoute = require('../routes/homeRouteur');
router.use('', homeRoute);
router.use('/user', userRoute);



module.exports = router;
