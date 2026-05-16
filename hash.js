const bcrypt = require("bcryptjs");

const generateHash = async () => {
  const password = "123456";

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(hashedPassword);
};

generateHash();