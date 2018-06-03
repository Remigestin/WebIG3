module.exports = function(pool) {

    var module = {};


    module.create = function(order, callback) {
        pool.connect( function(err, client, done) {
            const query = {
                name: 'create-order',
                text: 'INSERT INTO public.order (iduser) VALUES ($1) RETURNING *',
                values: [order.iduser]
            };

            client.query(query, (err, res) => {
                done();

                if (err) {
                    console.log(err);
                    callback.fail(err);
                }
                else {
                    order.idorder = res.rows[0].idorder;
                    order.dateorder = res.rows[0].dateorder;
                    callback.success(order);
                }
            })
        });
    };

    module.fill = function(linecart, order, callback) {
        pool.connect( function(err, client, done) {
            const query = {
                name: 'create-productorder',
                text: 'INSERT INTO public.productorder (idalbum, idorder) VALUES ($1, $2)',
                values: [linecart.idalbum, order.idorder]
            };

            client.query(query, (err, res) => {
                done();

                if (err) {
                    console.log(err);
                    callback.fail(err);
                }
                else {
                    callback.success();
                }
            })
        });
    };

    module.getByUser = function(idUser, callback) {
        pool.connect( function(err, client, done) {
            const query = {
                name: 'order_getByIdUser',
                text: 'SELECT * FROM public.order WHERE iduser = $1',
                values: [idUser]
            };

            client.query(query, (err, res) => {
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
    };

    module.getPrice = function(idOrder, callback) {
        pool.connect( function(err, client, done) {
            const query = {
                name: 'getPrice-Order',
                text: 'SELECT SUM(prixalbum) FROM public.productorder P, public.album A WHERE A.idalbum = P.idalbum AND idorder = $1',
                values: [idOrder]
            };

            client.query(query, (err, res) => {
                done();

                if (err) {
                    console.log(err);
                    callback.fail(err);
                }
                else {
                    console.log(res);
                    callback.success(res.rows[0].sum);
                }
            })
        });
    }

    module.getById = function(idOrder, idUser, callback) {
        pool.connect( function(err, client, done) {
            const query = {
                name: 'order_getById',
                text: 'SELECT * FROM public.order O, public.productorder P, public.album A WHERE O.idorder = P.idorder AND P.idalbum = A.idalbum AND P.idorder = $1 AND O.iduser = $2',
                values: [idOrder, idUser]
            };

            client.query(query, (err, res) => {
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
    };


    return module;


};
