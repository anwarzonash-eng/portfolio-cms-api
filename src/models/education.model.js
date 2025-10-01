import { sequelize } from "../utils/database";
import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'


const EducationModel = sequelize.define('Education', {
    // Model attributes are defined here
    id: {

        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true

    },
    university_name: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    private_title: {

        type: DataTypes.TEXT,
    },
    thumbnail: {
        type: DataTypes.TEXT
    },
    
    university_website_link: {
        type: DataTypes.TEXT,
        allowNull: true

    },
       main_profile_id: {
        type: DataTypes.UUID,
    },
    degree_name: {
        type: DataTypes.TEXT,
        allowNull: true

    },
    degree_description: {
        type: DataTypes.TEXT,
        allowNull: true

    },
    degree_start_date: {
        type: DataTypes.TEXT,
        allowNull: true

    },
    degree_end_date: {
        type: DataTypes.TEXT,
        allowNull: true

    },
    is_deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
        }

}
);
EducationModel.sync({alter: true})
export default EducationModel