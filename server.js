require("dotenv").config();

const createApp = require("./app");
const appDataSource = require("./api/models/dataSource");

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  await appDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((error) => {
      console.error("Error during Data Source initialization", error);
    });

  app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
  });
};

startServer();
