import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
  title: {
    type: String,
    // required: true,
    maxlength: 512,
  },
  url: {
    type: String,
    // required: true,
    maxlength: 4096,
  },
  order: {
    type: Number,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

linkSchema.pre('save', function (next) {
  this.updatedAt = new Date(); // Automatically update the timestamp
  next();
});

export const Link = mongoose.model('Link', linkSchema);
