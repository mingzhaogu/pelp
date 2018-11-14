const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = User = mongoose.model('User', UserSchema);

// import { Schema as _Schema, model } from "mongoose";
// const Schema = _Schema;

// const UserSchema = new Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   firstName: {
//     type: String
//   },
//   lastName: {
//     type: String
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

// export default (User = model("users", UserSchema));