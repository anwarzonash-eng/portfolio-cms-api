import { sequelize } from '../utils/database';
import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const LeadsModel = sequelize.define('Leads', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  name: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  source: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  source_category: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  content: {
    type: DataTypes.JSONB,
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'unchecked',
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

LeadsModel.sync({ alter: true });

export default LeadsModel;
