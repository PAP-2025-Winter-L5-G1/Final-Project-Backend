const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./Routes/auth");

const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the JWT Auth");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
