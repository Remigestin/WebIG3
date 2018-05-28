module.exports = function(pg, url) {

    var module = {};
    var Album = require('./album');

    const pool = new pg.Pool({
        connectionString: url,
        ssl:true
    })

    module.getAll = function(callback) {
        pool.connect( function(err, client, done) {
            const query = {
                name: 'getUserById',
                text: 'SELECT * FROM public.album'
            };

            pool.query(query, (err, res) => {
                done();
                if (err) {
                    console.log(err);
                    callback.fail(err);
                }
                else {
                    callback.success(res);
                }
            })
        });
    }

    return module;

}
