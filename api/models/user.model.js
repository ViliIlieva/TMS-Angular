const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALTROUNDS) || 5;

const userSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Username should be at least 5 characters"],
    validate: {
      validator: function (v) {
          return /[a-zA-Z0-9]+/g.test(v);
      },
      message: props => `${props.value} must contains only latin letters and digits!`
  },
  },
  password: {
    type: String,
    require: true,
    minlength: [5, "Password should be at least 5 characters"],
    validate: {
      validator: function (v) {
          return /[a-zA-Z0-9]+/g.test(v);
      },
      message: props => `${props.value} must contains only latin letters and digits!`
  },
  },
  tel: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.methods = {
  matchPassword: function (password) {
    return bcrypt.compare(password, this.password);
  },
};

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        next(err);
      }
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          next(err);
        }
        this.password = hash;
        next();
      });
    });
    return;
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
