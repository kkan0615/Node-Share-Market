/****************************************************************************************************
 * Authour: Youngjin Kwak(곽영진)
 * Table name: user
 * Purpose: User database
 * Element:
 *          email
 *          nickname - User's nickaname
 *          password
 *          isAdmin
 *          isValid
 *          phone
 *          provider - SNS Login
 *          snsId
 *          img - Main profile image
 * Last Update: 10/29/2019
 * Version: 1.0
*****************************************************************************************************/
module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        nickname: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'local',
        },
        snsId: {
            type: DataTypes.STRING(50),
        },
        img: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN(),
            allowNull: false,
            defaultValue: false,
        },
        isValidate: {
            type: DataTypes.BOOLEAN(),
            allowNull: false,
            defaultValue: true, //나중에 바꿔주세요 FALSE로 !!!!
        },
    }, {
        timestamps: true,
        paranoid: true,
        charset:'utf8',
        collate:'utf8_general_ci',
    })
);