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
    return module;
};
