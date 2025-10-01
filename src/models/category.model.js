import { sequelize } from '../utils/database';
import { Sequelize, DataTypes } from 'sequelize';

const CategoryModel = sequelize.define('Category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  label: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  designation: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tagline: {
    type: DataTypes.TEXT,
  },
  intro_heading: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  intro: {
    type: DataTypes.TEXT,
  },
  mainIntro_heading: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  mainIntro: {
    type: DataTypes.TEXT,
  },
  short_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  is_category_static: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  experience_intro: {
    type: DataTypes.JSON,
  },
  thumbnail: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  companytype: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  skills_ids: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

CategoryModel.sync({ alter: true });

export default CategoryModel;
