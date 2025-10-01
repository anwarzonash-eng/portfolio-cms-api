import { sequelize } from "../utils/database";
import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'
import { Env } from "../config";


const UserModel = sequelize.define('User', {
    // Model attributes are defined here
    id: {

        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull:false

    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
        
        

    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    password: {
        type: DataTypes.STRING
        
    },
},
 {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    }
}
);



(async ()=> {
    try {
       await UserModel.sync({alter: true})


       
    await UserModel.findOrCreate({
        where: {email: Env.adminEmail},
        defaults: {user_name: Env.adminUser, email: Env.adminEmail, password: Env.adminPassword}
       })
    } catch (error) {
        console.log('Error syncing model:', error)
    }
})();



export default UserModel