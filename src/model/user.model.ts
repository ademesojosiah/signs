"use strict";
import { Model, Optional, Sequelize, DataTypes } from "sequelize";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";



export enum Role {
  manager = "ADMIN",
  client = "USER",
}

export interface UserAttributes {
  id: number;
  fullname: string;
  email: string;
  password: string;
  role: Role;
  is_verified: boolean;
  passwordToken: string | null;
  passwordResetExpires: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInput
  extends Optional<
    UserAttributes,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "passwordResetExpires"
    | "passwordToken"
    | "is_verified"
  > {}
export interface UserOuput extends Required<UserAttributes> {}

export class User
  extends Model
  implements UserAttributes
{
  id!: number;
  fullname!: string;
  email!: string;
  password!: string;
  is_verified!: boolean;
  role!: Role;
  passwordToken!: string | null;
  passwordResetExpires!: Date | null;
  createdAt!: Date;
  updatedAt!: Date;

  async createJwt() {
    const secret: string = process.env.JWT_SECRET as string;
    const token = await jwt.sign(
      { userId: this.id, userEmail: this.email },
      secret,
      { expiresIn: "1d" }
    );

    return token;
  }

  async comparePassword(password: string): Promise<boolean> {
    const verify = await bcrypt.compare(password, this.password);
    return verify;
  }

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */

  static initModel(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        fullname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_verified: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        role: {
          type: DataTypes.ENUM,
          values: ['ADMIN', 'USER'],
          allowNull: false,
        },
        passwordToken: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
        passwordResetExpires: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        timestamps: true,
        tableName: "user",
      }
    );
  }

  static associate() {
    // define association here
  }
}
