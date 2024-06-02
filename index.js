const app = require("./src/app");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
