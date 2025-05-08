const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for vote count
PromptSchema.virtual('voteCount').get(function() {
  return this.upvotes.length - this.downvotes.length;
});

// Ensure virtuals are included in JSON output
PromptSchema.set('toJSON', { virtuals: true });
PromptSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Prompt', PromptSchema);