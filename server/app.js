require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./db/conn.js");
const Products = require("./models/productsSchema.js");
const DefaultData = require("./defaultdata.js");
const cors = require("cors");
const router = require("./routes/router.js");
const cookieParser = require("cookie-parser");
const validUrl = require("./routes/router");
const port = process.env.PORT || 5000;


connectDB();


app.use(cors({
  origin: ["http://localhost:3000", "https://amazon-clone-full-stack.vercel.app"],
  methods: ['POST', 'GET', 'HEAD', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser()); 


app.use("/api/v1", router); 
app.use(validUrl); 



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
