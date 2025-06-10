function ensureAuth(req, res, next) {
    console.log(req);
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "You don't have access" });
}

module.exports = ensureAuth;
