const User = require("../models/User");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUserController = async (req, res, next) => {
	try {
		const user = await User.find().select({ __v: 0, password: 0, name: 0 });
		if (!user) {
			return res.status(500).json({
				message: "Please go to signup!!",
			});
		}
		res.status(200).json({
			message: "User found!!",
			data: user,
		});
	} catch (err) {
		next(err);
	}
};

exports.signupController = async (req, res, next) => {
	try {
		const saltRounds = 10;
		// const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
		const { name, username, password } = req.body;
		const newUser = new User({
			name,
			username,
			password,
		});
		await newUser.save();
		res.status(201).json({
			data: newUser,
			message: "User was inserted successfuly!!",
		});
	} catch (err) {
		next(err);
	}
};

exports.signinController = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (user) {
			const isValidPassword = user.password == password;
			if (isValidPassword) {
				//token generate
				const token = jwt.sign(
					{
						username: user.username,
						userId: user._id,
					},
					process.env.JWT_SECRET,
					{
						expiresIn: "24h",
					}
				);
				res.status(200).json({
					access_token: token,
					message: "Login Successfully",
				});
			} else {
				res.status(401).json({
					error: "Authentication failed!!",
				});
			}
		} else {
			res.status(401).json({
				error: "Authentication failed!!",
			});
		}
	} catch (err) {
		next(err);
	}
};
