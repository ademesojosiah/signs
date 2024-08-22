"use strict";
import { Model, Optional, Sequelize, DataTypes } from "sequelize";
import { User } from "./user.model";
import { Video } from "./video.model";
import { Rating } from "./rating.model";
import { Text } from "./text.model";



export interface  TextVideoAttributes {
  id: number
  textId?: number;
  userId?: number;
  videoId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TextVideoInput
  extends Optional<
    TextVideoAttributes,
    "id"|
    "createdAt"
    | "updatedAt"

  > {}
export interface TextOutput extends Required<TextVideoAttributes> {}

export class TextVideo
  extends Model
  implements TextVideoAttributes
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        timestamps: true,
        tableName: "text_video",
      }
    );
  }

  static associate() {
    // define association here
    this.belongsTo(User, { foreignKey: 'userId' });
    this.belongsTo(Video,{  foreignKey: 'videoId', as: "video" });    
    this.belongsTo(Text,{  foreignKey: 'textId' , as: "text"});    


  }
}
