const mongoose = require("mongoose");

const authadminSchema = mongoose.Schema({
  name: {
    type: String,
    default:""
  },
  email:{
    type:String,
    default:""
  },
  image: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/008/154/360/small/student-logo-vector.jpg",
  },
  password: {
    type: String,
    default:""
  },
  confirmpassword:{
    type:String,
    default:""
  },
  role:{
    type:String,
    default:""
  },
  otp:{
    type:Number,
    default:""
  }
});

module.exports = mongoose.model("admin", authadminSchema);
