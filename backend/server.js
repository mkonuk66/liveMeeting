const express = require("express");
var cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const projectConfig = require("./config/projectConfig");
const mainRouter = require("./route/mainRouter");
const apiRouter = require("./route/apiRouter");

projectConfig.connectMongoDb();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());
app.use("/api", apiRouter);
app.use("/", mainRouter);

app.use((err, req, res, next) => {
  res.status(res.status).send({ Hata: err });
});

// app.listen(projectConfig.coreConfig.port, () => {
//   console.log(
//     `${projectConfig.coreConfig.port} numaralı porttan dinleme başladı.`
//   );
// });
