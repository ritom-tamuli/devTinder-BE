
const adminAuth = (req,res, next) => {
    const token = "xyzss";
    const isAdminAuthenticated = token === "xyz";

    if(!isAdminAuthenticated) {
        res.status(401).send("Authentication Failed!");
    } else {
        next();
    }
};

const userAuth = (req, res, next) => {
    const token = "abc";
    const isUserAuthenticated = token === "abc";

    if(!isUserAuthenticated) {
        res.status(401).send("User Authentication Failed!");
    } else {
        next();
    }
};


module.exports = {
    adminAuth,
    userAuth
};