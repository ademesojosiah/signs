"use strict";
import("dotenv/config");
import { Sequelize, DataTypes } from "sequelize";
import process from "process";
import { User } from "./user.model";
import { ContactUs } from "./contactUs.model";
import { Signs } from "./signs.model";

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true, // This will force SSL/TLS
        rejectUnauthorized: false, // This will allow self-signed certificates
        // Other SSL options can be specified here if needed
      },
    },
  }
);

//init models
User.initModel(sequelize);
ContactUs.initModel(sequelize)
Signs.initModel(sequelize)


// associate models
User.associate();
ContactUs.associate();
Signs.associate();


export default {
  sequelize,
  User,
  ContactUs,
  Signs
};
