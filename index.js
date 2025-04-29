import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";


import swaggerUi from "swagger-ui-express";
import swaggerSpec from './utils/swagger.js';

import todoRoute from "./Routes/todoRoute.js";
import usersRoute from "./Routes/usersRoute.js"

const app = express();
dotenv.config();

app.use(express.json()); // Built-in body-parser for parsing JSON
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(cookieParser()); // Enable cookie parsing

const CONNECTION_URL = process.env.MONGO_URL
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Welcome to the MERN To-Do List Backend!");
});


app.use("/service/todo", todoRoute)
app.use("/service/user", usersRoute)

app.use("/todolist/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: "Todo List Management API",
}))


mongoose.set("strictQuery", true);

// Start the server
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
