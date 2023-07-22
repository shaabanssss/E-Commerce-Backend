const express = require("express");
const app = express();
const dbConnection = require("./config/DBConnect");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { notfound, errorHandler } = require("./middlewares/errorHandler");
const dotenv = require("dotenv").config();

// mongo server
dbConnection();

// parse application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use("/api/user", require("./routes/authRoute"));
app.use("/api/product", require("./routes/productRoute"));
app.use("/api/blog", require("./routes/blogRoute"));
app.use("/api/product-category", require("./routes/productCategoryRoute"));
app.use("/api/blog-category", require("./routes/blogCategoryRoute"));
app.use("/api/brand-category", require("./routes/brandCategoryRoute"));
app.use("/api/coupon", require("./routes/couponRoute"));

// middleware
app.use(notfound);
app.use(errorHandler);

// server running
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});
