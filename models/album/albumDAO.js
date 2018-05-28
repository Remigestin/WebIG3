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

    module.getById = function(id, callback) {
        pool.connect( function(err, client, done) {
            const query = {
                name: 'getAlbumById',
                text: 'SELECT * FROM public.album WHERE idalbum = $1 ',
                values: [id]
            };


            pool.query(query, (err, res) => {
                done();

                if (err) {
                    console.log(err);
                    callback.fail(err);

                } else if (res.rowCount == 0){

                    callback.fail(null);

                }
                else {

                    var album = new Album(res.rows[0].idalbum, res.rows[0].nomalbum, res.rows[0].nomartiste, res.rows[0].prixalbum, res.rows[0].imagealbum, res.rows[0].descriptionalbum, res.rows[0].anneealbum, res.rows[0].genrealbum);
                    callback.success(album);
                }
            })
        });
    }

    return module;

}
