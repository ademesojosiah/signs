"use strict";
import { Model, Optional, Sequelize, DataTypes } from "sequelize";
import { Text } from "./text.model";
import { Video } from "./video.model";
import { User } from "./user.model";



export interface RatingAttributes {
  id: number;
  textId: number;
  userId?: number;
  videoId: number;
  ratingNo: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RatingInput
  extends Optional<
    RatingAttributes,
    "id"|
    "createdAt"
    | "updatedAt"

  > {}
export interface RatingOutput extends Required<RatingAttributes> {}

export class Rating
  extends Model
  implements RatingAttributes
{
  id! : number;
  ratingNo!: number;
  textId!: number;
  videoId!: number;


  static initModel(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        ratingNo: {
          type: DataTypes.FLOAT,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        timestamps: true,
        tableName: "rating",
      }
    );
  }

  static associate() {
    // define association here
    this.belongsTo(User,{ foreignKey: 'userId' });
    this.belongsTo(Video,{ foreignKey: 'videoId' });
    this.belongsTo(Text, { foreignKey: 'textId'})

  }
}
