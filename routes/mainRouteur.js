const express = require('express');
const router = express();

console.log("main Router");
userRoute = require('../routes/userRouteur');
router.use('/user', userRoute);

module.exports = router;
