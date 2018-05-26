var user = require("./user.js");

module.exports = function(pg, url) {

  var module = {};

 const pool = new pg.Pool({
   connectionString: url,
   ssl:true
 })



  module.create = function(user, callback) {
    pool.connect( function(err, client, done) {
      const query = {
        name: 'create-user',
        text: 'INSERT INTO public.user (login, password, email, isadmin) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [user.login, user.password, user.email, false]
      };


      pool.query(query, (err, res) => {

        if (err) {
          console.log(err);
          callback.fail(err);
        } else if (res.rowCount == 0){
          callback.fail(null);
        }
        else {
          user.iduser = res.rows[0].iduser;
          callback.success(user);
        }
      })
    });
  }

  return module;

}
