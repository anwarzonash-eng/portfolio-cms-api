import { sequelize } from '../utils/database';
import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const experienceModel = sequelize.define('Experiences', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
  },

  private_title: {
    type: DataTypes.TEXT,
  },

  main_profile_id: {
    type: DataTypes.UUID,
  },

  short_description: {
    type: DataTypes.TEXT,
  },

  long_description: {
    type: DataTypes.TEXT,
  },

  app_worked_description: {
    type: DataTypes.TEXT,
  },

  tech_descriptions: {
    type: DataTypes.TEXT,
  },

  company_name: {
    type: DataTypes.TEXT,
  },

  company_website: {
    type: DataTypes.TEXT,
  },

  company_linkedIn: {
    type: DataTypes.TEXT,
  },

  skills_ids: {
    type: DataTypes.JSON,
  },

  catagory: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  starting_date: {
    type: DataTypes.DATE,
  },

  ending_Date: {
    type: DataTypes.TEXT,
  },

  working: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },

  thumbnail: {
    type: DataTypes.TEXT,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  duplicate: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_dynamic: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },

  content_nature: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'static',
  },
  companytype: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'cypexsoft',
  },
});
experienceModel.sync({ alter: true });
export default experienceModel;
