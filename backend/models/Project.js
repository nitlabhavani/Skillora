import mongoose from 'mongoose';

const projectCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, default: '🌐' },
  total: { type: Number, default: 0 },
  active: { type: Number, default: 0 }
});

const ProjectCategory = mongoose.model('ProjectCategory', projectCategorySchema);
export default ProjectCategory;
