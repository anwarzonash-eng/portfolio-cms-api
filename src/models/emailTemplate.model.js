import { sequelize } from "../utils/database";
import { Sequelize, DataTypes } from 'sequelize';



const EmailTemplateModel = sequelize.define('EmailTemplate', {
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    templateName: {
        type: DataTypes.STRING(150),
        allowNull: true,
        
    },
    subject: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    templateContent: {
        type: DataTypes.TEXT,
        allowNull: true,
        
    },
});

EmailTemplateModel.sync()
export default EmailTemplateModel