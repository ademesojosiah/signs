"use strict";
import { Model, Optional, Sequelize, DataTypes } from "sequelize";
import { User } from "./user.model";



export interface SignsAttributes {
  id: number
  text: string;
  videoUrl: string;
  UserId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SignsInput
  extends Optional<
    SignsAttributes,
    "id"|
    "createdAt"
    | "updatedAt"

  > {}
export interface ContactUsOuput extends Required<SignsAttributes> {}

export class Signs
  extends Model
  implements SignsAttributes
{
  id! : number;
  text!: string;
  videoUrl!: string;
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
        text: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        videoUrl:{
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
        tableName: "Signs",
      }
    );
  }

  static associate() {
    // define association here
    this.belongsTo(User);

  }
}
