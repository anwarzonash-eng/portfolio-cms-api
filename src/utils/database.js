import { Sequelize, DataTypes } from 'sequelize';
import { Env } from "../config";

export const sequelize = new Sequelize(Env.dbString, { logging: false })
