import { sequelize } from "../utils/database";
import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'


const PhotoModel = sequelize.define('Photo', {
    // Model attributes are defined here
    id: {

        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true

    },
    user_id: {
        type: DataTypes.UUID,
        allowNull:false

    },
    photo_url: {
        type: DataTypes.TEXT,
        allowNull: false
        
        
    }
}
);
PhotoModel.sync()
export default PhotoModel