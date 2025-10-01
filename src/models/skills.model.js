import { sequelize } from '../utils/database';
import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const SkillModel = sequelize.define('Skill', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  catagory: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  order: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  variation: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
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
  companytype: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'cypexsoft',
  },
  icon: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_techstack: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
SkillModel.sync({ alter: true });
export default SkillModel;
