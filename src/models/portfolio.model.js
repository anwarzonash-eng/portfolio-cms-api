import { sequelize } from '../utils/database';
import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const protfolioModel = sequelize.define('Portfolios', {
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

  tagline_1: {
    type: DataTypes.TEXT,
  },

  tagline_2: {
    type: DataTypes.TEXT,
  },

  features_short: {
    type: DataTypes.TEXT,
  },

  tech_short: {
    type: DataTypes.TEXT,
  },

  skills_ids_shorts: {
    type: DataTypes.JSON,
  },

  features_long: {
    type: DataTypes.TEXT,
  },

  tech_long: {
    type: DataTypes.TEXT,
  },

  skills_ids_long: {
    type: DataTypes.JSON,
  },

  link: {
    type: DataTypes.TEXT,
  },

  thumbnail: {
    type: DataTypes.TEXT,
  },

  company_icon: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  pictures: {
    type: DataTypes.TEXT,
  },
  starting_date: {
    type: DataTypes.DATE,
  },

  ending_Date: {
    type: DataTypes.DATE,
  },
  duplicate: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  catagory: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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
  categorys: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  has_testimonial: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  is_for_cypexsoft: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  cypexsoft_category: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  display_order: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  my_role: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  services_i_provide: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  client_name: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  child_hero_banner: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  testimonial_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },



});
protfolioModel.sync({ alter: true });
export default protfolioModel;
