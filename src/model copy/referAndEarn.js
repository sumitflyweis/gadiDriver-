const mongoose = require("mongoose");
const { Schema } = mongoose;

const referralSchema = new Schema(
  {
    referralCode: {
      type: String,
      //unique: true,
    //   required: true,
    },
    // referredBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    // },
    referredUser: {
      type: Schema.Types.ObjectId,
      ref: "driver",
    },
  },
  {
    timestamps: true,
  }
);

// const balanceSchema = new Schema(
//   {
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     points: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
module.exports = mongoose.model("Referral", referralSchema);
// const Referral = mongoose.model("", );
// // const Balance = mongoose.model('Balance', balanceSchema);

// module.exports = { Referral /* Balance */ };
