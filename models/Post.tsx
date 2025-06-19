import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: String,
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', postSchema);
