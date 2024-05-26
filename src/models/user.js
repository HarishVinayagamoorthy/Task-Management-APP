
// userModel.js

import mongoose from './index.js';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is Required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is Required'],
      trim: true,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    dateUpdated: {
      type: Date,
      default: null,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  {
    collection: 'users',
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
