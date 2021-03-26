const sequelize = require('../config/connection');
const { User, Drawing } = require('../models');

const userData = require('./userData.json');
const drawingData = require('./drawingData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const drawing of drawingData) {
        await Drawing.create({
            ...drawing,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();