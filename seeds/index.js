const sequelize = require('../config/connection');
const seedBlogs = require('./blogData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBlogs();

  process.exit(0);
};

seedAll();
