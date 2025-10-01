import { sequelize } from '../utils/database';
import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const TestimonialsModel = sequelize.define('Testimonials', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  main_profile_id: {
    type: DataTypes.UUID,
  },

  review_text: {
    type: DataTypes.TEXT,
  },

  client_pic: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  client_name: {
    type: DataTypes.TEXT,
  },

  client_designation: {
    type: DataTypes.TEXT,
  },

  client_company: {
    type: DataTypes.TEXT,
  },

  client_company_website: {
    type: DataTypes.TEXT,
  },

  portfolio_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },

  display_order: {
    type: DataTypes.INTEGER,
  },

  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  video: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
TestimonialsModel.sync({ alter: true });
export default TestimonialsModel;
