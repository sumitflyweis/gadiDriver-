const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const verifyToken = (req, res, next) => {
    const token =
        req.get("Authorization")?.split("Bearer ")[1] ||
        req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "no token provided! Access prohibited",
        });
    }

    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).send({
                message: "UnAuthorised !",
            });
        }
        const user = await User.findOne({ _id: decoded.id });
        const user1 = await User.findOne({ _id: decoded.id });
        if (!user && !user1) {
            return res.status(400).send({
                message: "The user that this token belongs to does not exist",
            });
        }
        req.user = user || user1;
        next();
    });
};

module.exports = {
    verifyToken,
};
