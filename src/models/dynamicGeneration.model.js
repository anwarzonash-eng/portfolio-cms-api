import { sequelize } from '../utils/database';
import { Sequelize, DataTypes } from 'sequelize';

const DynamicGenerationModel = sequelize.define('Dynamic_Generation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  experience_variation1: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  experience_variation2: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  experience_variation3: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  experience_variation4: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  experience_variation5: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  experience_variation6: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  experience_variation7: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  experience_variation8: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  experience_variation9: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  experience_variation10: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  skills_ids: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  portfolio_variations: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  companytype: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  main_profile_id: {
    type: DataTypes.UUID,
  },

});
DynamicGenerationModel.sync({ alter: true });
export default DynamicGenerationModel;
