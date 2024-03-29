require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./utils/logger");
const limiter = require("./utils/limiter");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const ResourceNotFound = require("./utils/errors/ResourceNotFound");
const ServerError = require("./utils/errors/ServerError");
const corsOptions = require("./utils/cors");
const auth = require("./middlewares/auth");
const { sendEmail } = require("./controllers/email");
const { checkEmailReq } = require("./utils/joi");

const app = express();

const { PORT = 3030, NODE_ENV = "development" } = process.env;

app.set("port", PORT);
app.set("env", NODE_ENV);

app.use(helmet());

app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(requestLogger);
app.use(limiter);

app.use(auth);

app.post("/email", checkEmailReq, sendEmail);

app.use(errorLogger);

app.use((req, res, next) => new ResourceNotFound(req, res, next));

app.use(ServerError);

app.listen(PORT, () => {
  logger.log(
    `Express Server started on Port ${PORT} | Environment : ${NODE_ENV}`
  );
});
