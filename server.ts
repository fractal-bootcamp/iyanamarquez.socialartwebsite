import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/createUser", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
