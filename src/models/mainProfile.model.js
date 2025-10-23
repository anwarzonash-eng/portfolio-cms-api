import { sequelize } from '../utils/database';
import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { getRandomColor } from '../utils/randomColor';


const mainProfileModel = sequelize.define('Main_Profiles', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  domain: {
    type: DataTypes.TEXT,
  },
  name: {
    type: DataTypes.TEXT,
  },

  home_page_tagline: {
    type: DataTypes.TEXT,
  },

  profile_photo_1: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  profile_photo_2: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  profile_photo_3: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  email: {
    type: DataTypes.TEXT,
  },

  linkedIn: {
    type: DataTypes.TEXT,
  },

  hourly_rate: {
    type: DataTypes.FLOAT,
    defaultValue: 15,
  },

  facebook: {
    type: DataTypes.TEXT,
  },

  twitter: {
    type: DataTypes.TEXT,
  },

  behance_link: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  instagram: {
    type: DataTypes.TEXT,
  },

  upwork: {
    type: DataTypes.TEXT,
  },

  github: {
    type: DataTypes.TEXT,
  },
  phone_no: {
    type: DataTypes.TEXT,
  },
  location: {
    type: DataTypes.TEXT,
  },
  color1: {
    type: DataTypes.TEXT,
  },
  color2: {
    type: DataTypes.TEXT,
  },
  color3: {
    type: DataTypes.TEXT,
  },
  color4: {
    type: DataTypes.TEXT,
  },

  primary_color: {
    type: DataTypes.TEXT,
    defaultValue: getRandomColor(),
  },

  page_bg_color: {
    type: DataTypes.TEXT,
    defaultValue: getRandomColor(),
  },

  banner_bg_color: {
    type: DataTypes.TEXT,
    defaultValue: getRandomColor(),
  },

  section_bg_color: {
    type: DataTypes.TEXT,
    defaultValue: getRandomColor(),
  },

  heading_color: {
    type: DataTypes.TEXT,
    defaultValue: getRandomColor(),
  },

  paragrapgh1_color: {
    type: DataTypes.TEXT,
    defaultValue: getRandomColor(),
  },

  paragrapgh2_color: {
    type: DataTypes.TEXT,
    defaultValue: getRandomColor(),
  },

  border_color: {
    type: DataTypes.TEXT,
    defaultValue: getRandomColor(),
  },

  googleAnalyticsScript: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  companytype: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'cypexsoft',
  },
  video: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  no_of_experiences: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  projects_completed: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  calendly_link: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
mainProfileModel.sync({ alter: true });
export default mainProfileModel;
