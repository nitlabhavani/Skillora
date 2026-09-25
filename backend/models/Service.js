import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  profileImg: {
    type: String,
    default: ''
  },
  workImg: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  skills: [{
    type: String
  }],
  rate: {
    type: String,
    required: true
  },
  hourlyRate: {
    type: Number,
    default: 0
  },
  group: {
    type: String,
    required: true
  },
  categoryName: {
    type: String,
    default: ''
  },
  categoryDesc: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;
