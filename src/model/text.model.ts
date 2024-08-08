"use strict";
import { Model, Optional, Sequelize, DataTypes } from "sequelize";
import { User } from "./user.model";
import { Video } from "./video.model";



export interface  TextAttributes {
  id: number
  text: string;
  UserId?: number;
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
          allowNull: false,
          unique:true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        timestamps: true,
        tableName: "Text",
      }
    );
  }

  static associate() {
    // define association here
    this.belongsTo(User);
    this.belongsTo(Video,{ as: 'parentVideo', foreignKey: 'videoId' });
    this.hasMany(Video, { as: 'childVideos', foreignKey: 'textId'})

  }
}
