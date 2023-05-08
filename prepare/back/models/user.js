module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User", // MySQL에는 "users"로 자동 변경되어 테이블 생성
    {
      // id는 기본적으로 들어있다.
      email: {
        type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: false, // false가 필수
        unique: true, // 고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      // 한글로 저장할 수 있도록 설정
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post); // User는 여러 글를 작성할 수 있다.
    db.User.hasMany(db.Comment); // User는 여러 댓글를 작성할 수 있다.
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); // User는 여러 게시글을 좋아요할 수 있다.

    // 📖
    // 같은 테이블끼리 연관관계를 맺을 땐 둘다 UserId이기 때문에 구분해주기 위해 foreignKey를 사용한다.
    // 나의 팔로워를 찾으려면 나를 먼저 찾는다.(foreignKey : followingId)
    // 내가 팔로잉 한 유저를 찾으려면 나를 먼저 찾는다.(foreignKey : followerId)
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  };
  return User;
};
