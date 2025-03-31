import { comparePassword } from '../../services/bcrypt.service.js';
import { SYSTEM_ROLES } from '../../shared/constants/constant.js';

export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'users',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      countryCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      role: {
        type: DataTypes.ENUM(Object.values(SYSTEM_ROLES)),
        allowNull: false,
        defaultValue: SYSTEM_ROLES.user,
      },
    },
    {
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['email'],
          name: 'unique_email_index',
        },
      ],
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: { attributes: {} },
      },
    }
  );

  // Users.associate = (models) => {
  //   Users.belongs(models.roles, {
  //     foreignKey: 'roleId',
  //   });
  // };

  // Instance method for password comparison
  Users.prototype.isPasswordMatch = async function (password) {
    const isMatch = await comparePassword(password, this.password);
    return isMatch;
  };

  return Users;
};
