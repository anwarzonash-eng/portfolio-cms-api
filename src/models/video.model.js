import { sequelize } from '../utils/database';
import { Sequelize, DataTypes } from 'sequelize';

const VideoModel = sequelize.define('Video', {
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
  video: {
    type: DataTypes.TEXT,
  },

  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
VideoModel.sync({ alter: true });
export default VideoModel;
