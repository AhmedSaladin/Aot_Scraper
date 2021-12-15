import express from "express";
import route from "./router";

const app = express();

app.use(route);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server is running..."));
