const authRoutes = require('./auth.route');
const productRoutes = require('./product.route');
const reviewRoutes = require('./review.route');
const cartRoutes = require('./cart.route');
const addressRoutes = require('./address.route');
const orderRoutes = require('./order.route');
const featureRoutes = require('./feature.route');
const searchRoutes = require('./search.route');

module.exports = (app) => {
    app.use('/api/auth', authRoutes);

    app.use('/api/product', productRoutes);

    app.use('/api/review', reviewRoutes);

    app.use('/api/cart', cartRoutes);

    app.use('/api/address', addressRoutes);

    app.use('/api/order', orderRoutes);

    app.use('/api/feature', featureRoutes);

    app.use('/api/search', searchRoutes);
}