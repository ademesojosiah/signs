"use strict";
import { Model, Optional, Sequelize, DataTypes } from "sequelize";
import { User } from "./user.model";
import { Rating } from "./rating.model";
import { TextVideo } from "./textVideo.model";



export interface  TextAttributes {
  id: number
  text: string;
  userId?: number;
  videoId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TextInput
  extends Optional<
    TextAttributes,
    "id"|
    "createdAt"
    | "updatedAt"

  > {}
export interface TextOutput extends Required<TextAttributes> {}

export class Text
  extends Model
  implements TextAttributes
{
  id! : number;
  text!: string;
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
          unique:true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        timestamps: true,
        tableName: "text",
      }
    );
  }

  static associate() {
    // define association here
    this.belongsTo(User, { foreignKey: 'userId' });
    this.hasMany(TextVideo, { foreignKey: 'textId', onDelete:"CASCADE", as :"textVideos"});
    this.hasMany(Rating,{onDelete:"CASCADE", foreignKey:'textId'});

  }
}
