'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helper/helper');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: 'Username is required' },
					notEmpty: { msg: 'Username is required' },
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: 'Email is required' },
					notEmpty: { msg: 'Email is required' },
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: 'Password is required' },
					notEmpty: { msg: 'Password is required' },
				},
			},
		},
		{
			hooks: {
				beforeCreate(user) {
					user.password = hashPassword(user.password);
				},
			},
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
