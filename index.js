const app = require("./app");
const { connectDB } = require("./src/db/index");

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `app running in port 🔗: http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(`Error occurred 💥: ${error}`);
  });
