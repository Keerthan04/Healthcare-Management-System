const jwt = require('jsonwebtoken');
require('dotenv').config();

function verify_patient(req, res, next) {
    console.log("verify_patient middleware");
    try {
        const token = req.cookies.jwt;
        console.log(token);
        if (!token) {
            return res.status(401).json({
                error: "Unauthorized - No token",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded.role !== 'patient') {
            return res.status(401).json({
                error: "Unauthorized - Invalid role",
            });
        }
        if (!decoded.id) {
            return res.status(401).json({
                error: "Unauthorized - Invalid ID",
            });
        }

        req.id = decoded.id;
        req.role = decoded.role;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: "Internal Server Error",
        });
        
    }
}

module.exports = {verify_patient};