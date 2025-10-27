import { sequelize } from '../utils/database';
import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const tiny_url = sequelize.define('tiny_url', {
  uniqe_id: {
    type: Sequelize.STRING(4),
    allowNull: false,
    unique: true,
    defaultValue: function () {
      // Generate a random 4-character alphanumeric string with integers
      const alphabet =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~';
      let id = '';
      for (let i = 0; i < 4; i++) {
        id += alphabet[Math.floor(Math.random() * alphabet.length)];
      }
      return id;
    },
  },

  // Model attributes are defined here
  target_link: {
    type: DataTypes.TEXT,
  },
  type: {
    type: DataTypes.TEXT,
    values: [
      'portfolio_main',
      'portfolio_detail',
      'profile',
      'cv',
      'cover_letter',
      'contact_me',
      'blog'

    ],
  },
  is_u: {
    type: DataTypes.BOOLEAN,
  },
  main_profile_id: {
    type: DataTypes.UUID,
  },
  portfolio_id: {
    type: DataTypes.UUID,
  },
  detail_profile_id: {
    type: DataTypes.UUID,
  },
  portfolio_link: {
    type: DataTypes.UUID,
  },
});
tiny_url.sync({ alter: true });
export default tiny_url;
