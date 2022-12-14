module.exports = {
    isLoggedIn: function (req, res, next) {
        // return next();
        if (req.isAuthenticated()) {
            return next();
        }
        // req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/login');
    },
    isntLoggedIn: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        // req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/');
    },
};