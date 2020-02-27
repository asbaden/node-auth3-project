  
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(
			token,
			process.env.JWT_SECRETE || "secret",
			(err, decoded) => {
				if (err) {
					res.status(500).json({ message: "The Token is Invalid" });
				} else {
					req.decodedToken = decoded;
					next();
				}
			}
		);
	} else {
		res.status(400).json({ message: 'You shall not pass!'});
    }
};