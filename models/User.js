const mongoose = require('mongoose');
const validate = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
},
email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
 
},
password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
   
},
age: {
    type: Number,
    default: 0,
 
},
tokens: [{
    token: {
        type: String,
        required: true
    }
}]
});
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'secret')

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
      throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
      throw new Error('Unable to login')
  }

  return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})
  const User = mongoose.model('User', userSchema);
  // User.find().exec((err,users)=>{
  //   console.log(users);
    
  // })
  module.exports = User;
