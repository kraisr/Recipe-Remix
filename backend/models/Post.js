import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  },
  name: String, 
  image: String,
  caption: String,
  ingredients: [{
    type: String,
    required: false,
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  ratings: [
    {
      type: Number,
      min: 0,
      max: 5,
    },
  ],
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual field for average rating
postSchema.virtual('averageRating').get(function() {
  if (this.ratings.length > 0) {
    const sum = this.ratings.reduce((acc, rating) => acc + rating, 0);
    return parseFloat((sum / this.ratings.length).toFixed(2)); // Rounds to 2 decimal places
  } else {
    return 0; // Default to 0 if no ratings
  }
});

const Post = mongoose.model('Post', postSchema);
export default Post;
