module.exports = function(){
  const bcrypt = require('bcryptjs');
  const uuidv4 = require('uuid/v4');
  const jwt = require('jsonwebtoken');

  const randomSecretKey = uuidv4();

  const module = {};

  //callback succeed if authenticate succeed, otherwise callback fail
  module.authenticate = function (req, callback) {
    const token = req.cookies['userToken'];
    if (token){
      jwt.verify(token, randomSecretKey, function (err, decoded) {
        if(err){
          callback.fail("WRONG_TOKEN_AUTH");
        } else {
          callback.success(decoded);
        }
      });
    } else {
      callback.fail("NO_TOKEN_AUTH");
    }
  };

  //return the hashed version of the password
  module.hashPassword = function (plainPassword) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainPassword, salt);
  };

  //return true if hash(plainPassword) == password
  module.checkPassword = function (plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword)
  };

  // return the jsonWebToken as string
  module.createToken = function (payload) {
    return jwt.sign(payload, randomSecretKey);
  };


  return module;
};
