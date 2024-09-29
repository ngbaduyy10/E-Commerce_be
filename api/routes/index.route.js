const authRoutes = require('./auth.route');
const productRoutes = require('./product.route');
const reviewRoutes = require('./review.route');
const cartRoutes = require('./cart.route');

module.exports = (app) => {
    app.use('/api/auth', authRoutes);

    app.use('/api/product', productRoutes);

    app.use('/api/review', reviewRoutes);

    app.use('/api/cart', cartRoutes);
}