"use strict";
import { Model, Optional, Sequelize, DataTypes } from "sequelize";
import { User } from "./user.model";
import { Text } from "./text.model";
import { Rating } from "./rating.model";

export interface VideoAttributes {
  id: number;
  videoUrl: string;
  userId?: number;
  textId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VideoInput
  extends Optional<VideoAttributes, "id" | "createdAt" | "updatedAt"> {}
export interface VideoOutput extends Required<VideoAttributes> {}

export class Video extends Model implements VideoAttributes {
  id!: number;
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
        videoUrl: {
          type: DataTypes.STRING,
          unique: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        timestamps: true,
        tableName: "video",
      }
    );
  }

  static associate() {
    // define association here
    this.belongsTo(User,{ foreignKey: 'userId' });
    this.belongsTo(Text, { as: "parentText", foreignKey: 'textId' }); 
    this.hasMany(Text, { as: "childText", foreignKey: 'videoId' ,onDelete:"CASCADE"});
    this.hasMany(Rating,{onDelete:"CASCADE", foreignKey:"videoId"})
  }
}
