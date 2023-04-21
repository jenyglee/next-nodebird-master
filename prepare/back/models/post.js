module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        "Post",
        {
            // id는 기본적으로 들어있다.
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            // UserId: {}
        },
        {
            // 한글+이모티콘을 저장할 수 있도록 설정
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        }
    )
    Post.associate = (db) => {
        // belongsTo를 넣으면 필드에 'UserId: 1' 이런식으로 추가해주는 것과 같다. 이걸로 나중에 추적할 수 있다.
        db.Post.belongsTo(db.User)
        db.Post.hasMany(db.Comment)
        db.Post.hasMany(db.Image)
        db.Post.belongsToMany(db.Hashtag)
        db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }) // Post는 여러 유저의 좋아요를 받을 수 있다.
        db.Post.belongsTo(db.Post, { as: "Retweet" }) // Post는 다른 Post의 리트윗일 수 있다.
    }
    return Post
}
