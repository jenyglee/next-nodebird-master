const Sequelize = require("sequelize");

// 1. 개발환경을 기본값인 development 로 설정한다.
const env = process.env.NODE_ENV || "development";
// 2. 데이터베이스 설정했던 config 파일의 "development" 설정을 가져온다.
const config = require("../config/config.json")[env]; // ([env]는 "development")
// 3. db 에 빈객체를 일단 생성한다.
const db = {};

// 4. 시퀄라이즈에 config(설정)에 있는 데이터베이스명, 유저네임, 패스워드를 가져와서 등록한다.
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// 👆
// 여기까지 시퀄라이즈가 node와 mySQL을 연결해주는 과정이다.
// 연결이 성공하면 시퀄라이즈 객체에 연결 정보가 담겨있다.

// 이제 테이블을 만들어준 뒤 이어서 연결을 해준다.
// ====================
// comment.js를 보면
// module.export = (sequelize, DataTypes) => {} 👈 이런 형태이다.
// 저 매개변수 자리에 sequelize, Sequelize를 집어넣어주면 👇 코드가 만들어진다.
db.Comment = require("./comment")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);
// ====================

// 👇 각 테이블의 associate 부분을 연결시켜준다.(관계 맺는부분)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
