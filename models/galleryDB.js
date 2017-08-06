module.exports = function(sequelize, DataTypes) {
  var Gallery = sequelize.define("Gallery", {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });

  return Gallery;
};