const bcrypt = require("bcryptjs");

module.exports = {
  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  },
  async comparePassword(passwordForm, passwordUser) {
    return await bcrypt.compare(passwordForm, passwordUser);
  },
};
