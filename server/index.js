const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDb = require("./config/db");
const user = require("./routes/user");
const barber = require("./routes/barBer");
const photo = require("./routes/photo");
const haircut = require("./routes/hairCut");
const expenses = require("./routes/expense");
const product = require("./routes/product");
const auth = require("./routes/auth");
const income=require('./routes/income');


dotenv.config();
connectDb();

app.use(cors());
app.use(express.json());
app.use(process.env.USER_URL, user);
app.use(process.env.BARBER_URL, barber);
app.use(process.env.photo_URL, photo);
app.use(process.env.haircut_URL, haircut);
app.use(process.env.EXPENSES_URL, expenses);
app.use(process.env.PRODUCT_URL, product);
app.use(process.env.auth_URL, auth);
app.use(process.env.INCOME_URL, income)


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`active on ${port}`));
