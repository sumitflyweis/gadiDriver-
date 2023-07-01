const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;

const postSchema = mongoose.Schema(
  {
    category: {
      type: objectid,
      ref: "categoryInterest",
    },
    image_vedio: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.simplilearn.com%2Fimage-processing-article&psig=AOvVaw1kvCFmU96sIc0v4VgaPKW8&ust=1682860597316000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCODu37iWz_4CFQAAAAAdAAAAABAE",
    },
    topic: {
      type: String,
    },
    desc: {
      type: String,
    },
    like: {
      count: {
        type: Number,
        default: 0,
      },
      driver: [
        {
          type: objectid,
          ref: "driver",
        },
      ],
      employer: [
        {
          type: objectid,
          ref: "jobService",
        },
      ],
    },
    comment: {
      count: {
        type: Number,
        default: 0,
      },
      driver: [
        {
          type: objectid,
          ref: "driver",
        },
        {
          comment: {
            type: String,
            default: "",
          },
        },
      ],
      employer: [
        {
          type: objectid,
          ref: "jobService",
        },
        {
          comment: {
            type: String,
            default: "",
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", postSchema);



   
//     like: {
//         count: {
//           type: Number,
//           default: 0,
//         },
//         status:{
//           type:Boolean,
//           default:false
//         },
//         user: [
//           {
//             type: objectId,
//             ref: "userProfile",
//           },
//         ],
//        },
//        comment: {
//         count: {
//           type: Number,
//           default: 0,
//         },
//         user: {
//           type: objectId,
//           ref: "userProfile",
//         },
//       },
//         comments: [
//           // {
//           //   user: {
//           //     type: objectId,
//           //     ref: "userProfile",
//           //   },
//           //   comment: {
//           //     type: String,
//           //     default: ""
//           //   }
//           // }
//         ]
      
//       },{
//       timestamps:true
//     })


// const communitymodel = mongoose.model('community', communitySchema);

// module.exports = communitymodel;


