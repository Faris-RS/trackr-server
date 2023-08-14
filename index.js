import express from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import connection from "./config/dbConnection.js";
import userAuthRouter from "./routes/user-routes/user-auth-route.js";
import userSearchRouter from "./routes/user-routes/user-search-route.js"
import adminAuthRouter from "./routes/admin-routes/admin-auth-route.js";
import adminUserManagmentRouter from "./routes/admin-routes/admin-user-managment-route.js";
import adminVehicleManagmentRouter from "./routes/admin-routes/admin-vehicle-managment-route.js";
import adminOrderManagmentRouter from "./routes/admin-routes/admin-order-managment-route.js";

const app = express();
dotenv.config();
connection();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(logger("dev"));
app.use(cookieParser());
app.use(cors());

app.use("/user", userAuthRouter);
app.use("/user/search", userSearchRouter);

app.use("/admin", adminAuthRouter);
app.use("/admin/user", adminUserManagmentRouter);
app.use("/admin/vehicle", adminVehicleManagmentRouter);
app.use("/admin/orders", adminOrderManagmentRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
