const express = require('express');
const port = 3000;
const app = express();

const { User, Guest } = require('./models');
const { comparePassword, signPayload, verifyToken } = require('./helper/helper');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

authentication = async (req, res, next) => {
	try {
		const { access_token } = req.headers;
		if (!access_token) {
			throw { name: 'JsonWebTokenError', message: 'No token provided' };
		}
		const payload = await verifyToken(access_token);
		const user = await User.findOne({ where: { email: payload.email } });
		if (!user) {
			throw { name: 'JsonWebTokenError', message: 'Invalid token' };
		}
		req.currentUser = { id: user.id, email: user.email };
		next();
	} catch (err) {
		console.log(err);
		next(err);
	}
};

app.post('/register', async (req, res, next) => {
	try {
		const { username, email, password } = req.body;

		const foundUser = await User.create({
      username,
			email,
			password,
		});

		res.status(201).json({
			id: foundUser.id,
      username: foundUser.username,
			email: foundUser.email,
		});
	} catch (err) {
		next(err);
	}
});

app.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email) {
			throw { name: 'BadRequest', message: 'Email is required' };
		}
		if (!password) {
			throw { name: 'BadRequest', message: 'Password is required' };
		}
		const user = await User.findOne({ where: { email } });
		// console.log(user);
		if (!user || !comparePassword(password, user.password)) {
			throw { name: 'Unauthorized', message: 'Invalid email/password' };
		}
		const payload = {
			id: user.id,
			email: user.email,
		};
		const access_token = signPayload(payload);
		res.status(200).json({ message: 'Login Success!', access_token });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

app.post('/guests', async (req, res, next) => {
	try {
		const { name, address, phone, note } = req.body;

		const result = await Guest.create({
			name,
			address,
			phone,
			note,
		});

		const message = `New guest has been created`;
		res.status(201).json({
			message: message,
			newGuest: result,
		});
	} catch (err) {
		console.log(err);
		``;
		next(err);
	}
});

app.get('/guests', async (req, res, next) => {
	try {
		const guest = await Guest.findAll({
			attributes: {
				exclude: ['id', 'address', 'phone', 'createdAt', 'updatedAt'],
			},
		});
		res.status(200).json(guest);
	} catch (err) {
		console.log(err);
		next(err);
	}
});

app.use(authentication);

app.get('/admin', async (req, res, next) => {
	try {
		const guest = await Guest.findAll({
			attributes: {
				exclude: ['createdAt', 'updatedAt'],
			},
		});
		res.status(200).json(guest);
	} catch (err) {
		console.log(err);
		next(err);
	}
});

app.delete('/guests/:id', async (req, res, next) => {
	try {
		let { id } = req.params;
		let guest = await Guest.findOne({
			where: { id },
		});
		if (!guest) {
			throw { name: 'NotFound', message: `Guest Note not found!` };
		}
		await Guest.destroy({
			where: { id },
		});
		res.status(200).json({ message: 'Guest Note has been deleted' });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// ================== ERROR HANDLING ==================
app.use((err, req, res, next) => {
	let status = 500;
	let message = 'Internal Server Error';
	switch (err.name) {
		case 'SequelizeValidationError':
		case 'SequelizeUniqueConstraintError':
			status = 400;
			message = err.errors[0].message;
			break;
		case 'JsonWebTokenError':
			status = 401;
			message = err.message;
			break;
		case 'Bad Request':
			status = 400;
			message = err.message;
			break;
		case 'Forbidden':
			status = 403;
			message = err.message;
			break;
		case 'Not Found':
			status = 404;
			message = err.message;
		default:
			break;
	}
	res.status(status).json({ message });
});

app.listen(port, () => console.log(`App runing on port ${port}`));
