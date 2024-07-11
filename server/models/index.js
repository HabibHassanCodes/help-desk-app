const { HelpRequestForm } = require("./HelpRequestForm.js");
const { User } = require("./User");

HelpRequestForm.belongsTo(User);
User.hasMany(HelpRequestForm);

module.exports = {
  User,
  HelpRequestForm,
};