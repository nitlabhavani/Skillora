import mongoose from 'mongoose';

const reportCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, default: '📊' },
  status: { type: String, default: 'Active' },
  trend: { type: String, default: '+0.0%' }
});

const ReportCategory = mongoose.model('ReportCategory', reportCategorySchema);
export default ReportCategory;
