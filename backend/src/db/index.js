import s from 'sequelize';
import productModel from './products.js';
import reviewModel from './reviews.js';

const Sequelize = s.Sequelize;
const DataTypes = s.DataTypes;
const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: 'postgres',
});

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log(' ✅ Connection is working');
  } catch (error) {
    console.log('❌ Unable to connect', error);
  }
};
const models = {
  Product: productModel(sequelize, DataTypes),
  Review: reviewModel(sequelize, DataTypes),
  sequelize: sequelize,
};

models.Product.hasMany(models.Review);
models.Review.belongsTo(models.Product);

test();

export default models;
