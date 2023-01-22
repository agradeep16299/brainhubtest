const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    fullName: { type: String, 
      required: true,
       minlength: 4,
        maxlength: 30
       },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    password: { type: String, required: true, minlength: 6, maxlength: 1024 },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);