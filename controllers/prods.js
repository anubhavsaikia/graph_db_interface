const Prod = require('../models/prod');


exports.get_products = (req, res, next) => {

    const all_products = Prod.get_all();
    var data;
    all_products
        .then(
            function (value) {
                data = value.rows;

            }
        )
        .finally(
            function () {
                res.render('prods', {
                    pageTitle: 'All Products',
                    path: '/prods',
                    listnames: data
                });
            }
        );
};

exports.add_cart = (req, res, next) => {
    var id = req.body.product_id;

    const update = Prod.decrement(id);
    update.then(
        function (v) {
            if (v.rowCount > 0) {
                Cart.add(id)
                .then(
                    function (value) {
                        if (value.rowCount > 0) {
                            res.redirect('/cart');
                        }
                    }
                )
                .catch(err => console.log(err))
            }
            else {
                res.redirect('/prods');
            }
        },
        function (e) {
            console.log(e);
        }
    )
    .catch(err => console.log(err));
}
