const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
//const multer = require("multer");
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyparser = require("body-parser");

const serverless = require("serverless-http");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3006;


mongoose
  .connect("mongodb+srv://gadi_Driver:ME7nq2lmqnIgUt3w@cluster0.kg5relm.mongodb.net/")
  .then(() => {
    console.log("Db conneted succesfully");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/home", (req, res) => {
  res.status(200).send({ msg: "Working App" });
});

app.use('/api/v1/authadminn', require('./src/route/Admin/authadmin'))
app.use("/api/v1/locationn", require("./src/route/Admin/location"));
app.use("/api/v1/jobType", require("./src/route/Admin/jobType"));
app.use("/api/v1/Faq", require('./src/route/Admin/faq'))
app.use("/api/v1/categoryy", require("./src/route/Admin/category"));
app.use("/api/v1/help", require('./src/route/Admin/helpAndSupport'))
app.use("/api/v1/languages", require("./src/route/Admin/different_Language"));
app.use("/api/v1/auth", require("./src/route/Auth/auth"));




// app.use("/api/v1/auth", require("./src/route/authEmployee&Owner"));
app.use("/api/v1/driverr", require("./src/route/driver"));
app.use("/api/v1/driver_experience", require("./src/route/driver_experience"));
app.use("/api/v1/vehicletype", require("./src/route/vehicletype"));
app.use("/api/v1/camAndBrowse", require("./src/route/cameraAndBrowse"));
app.use("/api/v1/employ", require("./src/route/employer"));
app.use("/api/v1/jobServices", require("./src/route/jobService"));
app.use("/api/v1/subscrip", require('./src/route/subscription'))
app.use("/api/v1/action", require('./src/route/employerAction'))
app.use("/api/v1/categoryInterestt", require('./src/route/categoryInterest'))
app.use("/api/v1/postt", require('./src/route/post'))
app.use("/api/v1/refer", require('./src/route/referAndEarn'))
app.use('/api/v1/packageCompare', require('./src/route/gallery_packageUtilisation'))
app.use('/api/v1/vedioo', require('./src/route/vedio'))
app.use('/api/v1/wishlistt', require('./src/route/wishlist'))
app.use('/api/v1/petrolrate', require('./src/route/rateOfpetrolRate'))
app.use("/api/v1/adharveri", require('./src/route/addharverification'))
app.use("/api/v1/noti", require("./src/route/notifcation"))
// app.use('/api/v1/paymentt',paymentt)



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = {
  handler: serverless(app),
};


