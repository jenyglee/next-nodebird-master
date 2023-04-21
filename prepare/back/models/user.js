module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            email: {},
            nickname: {},
            password: {},
        },
        {}
    );
    return User;
};
