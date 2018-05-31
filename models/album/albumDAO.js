module.exports = function(pg, url) {

    var module = {};
    var Album = require('./album');

    const pool = new pg.Pool({
        connectionString: url,
        ssl:true
    })

    module.create = function (album, callback) {
        pool.connect(function (err, client, done) {
            const query = {
                name: 'create-album',
                text: 'INSERT INTO public.album (nomalbum, nomartiste, prixalbum, imagealbum, descriptionalbum, anneealbum, genrealbum) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                values: [album.nomalbum, album.nomartiste, album.prixalbum, album.imagealbum, album.descriptionalbum, album.anneealbum, album.genrealbum]
            };


            pool.query(query, (err, res) => {
                done();
                client.end().then(()=>console.log('disconnected'))
                    .catch();
                if (err) {
                    console.log(err);
                    callback.fail(err);
                } else if (res.rowCount == 0) {
                    callback.fail(null);
                }
                else {
                    album.idalbum = res.rows[0].idalbum;
                    callback.success(album);
                }
            })
        });
    }

    module.getAll = function(callback) {
        pool.connect( function(err, client, done) {
            const query = {
                name: 'getUserById',
                text: 'SELECT * FROM public.album'
            };

            pool.query(query, (err, res) => {
                done();
                client.end().then(()=>console.log('disconnected'))
                    .catch();
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
                client.end().then(()=>console.log('disconnected'))
                    .catch();

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

    module.delete = function(id, callback) {
        pool.connect( function(err, client, done) {
            const query = {
                name: 'deleteAlbum',
                text: 'DELETE FROM public.album WHERE idalbum = $1 ',
                values: [id]
            };


            pool.query(query, (err, res) => {
                done();
                client.end().then(()=>console.log('disconnected'))
                    .catch();

                if (err) {
                    console.log(err);
                    callback.fail(err);

                }
                else {
                    callback.success();
                }
            })
        });
    }

    module.getBySearch = function(search, callback) {
        pool.connect( function(err, client, done) {
            const query = {
                name: "getAlbumBySearch",
                text: "SELECT * FROM public.album WHERE nomalbum LIKE $1 OR nomartiste LIKE $1 ",
                values: [search]
            };


            pool.query(query, (err, res) => {
                done();
                client.end().then(()=>console.log('disconnected'))
                    .catch();


                if (err) {
                    console.log(err);
                    callback.fail(err);

                } else if (res.rowCount == 0){

                    callback.fail(null);

                }
                else {
                    callback.success(res);
                }
            })
        });
    }

    return module;

}
