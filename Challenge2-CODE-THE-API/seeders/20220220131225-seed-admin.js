'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('Users', [
			{
				username: 'admin',
				email: 'admin@mail.com',
				password: 'kt3334@#@!ls',
        createdAt: new Date(),
        updatedAt: new Date()
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Users', null, {});
	},
};
