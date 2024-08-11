"use strict";
import { Model, Optional, Sequelize, DataTypes } from "sequelize";



export interface ContactUsAttributes {
  id:number
  email: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactUsInput
  extends Optional<
    ContactUsAttributes,
    "id"|
    "createdAt"
    | "updatedAt"

  > {}
export interface ContactUsOuput extends Required<ContactUsAttributes> {}

export class ContactUs
  extends Model
  implements ContactUsAttributes
{
  id!: number;
  email!: string;
  description!: string;
  createdAt!: Date;
  updatedAt!: Date;


  static initModel(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: false, 
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        timestamps: true,
        tableName: "contact_us",
      }
    );
  }

  static associate() {
    // define association here
  }
}
