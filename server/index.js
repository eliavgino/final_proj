const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDb = require("./config/db");
const user = require("./routes/user");

dotenv.config();
connectDb();

app.use(cors());
app.use(express.json());
app.use(process.env.USER_URL, user);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`active on ${port}`));
