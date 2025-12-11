import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [String], // Array of strings e.g. ["React", "Node"]
  image: {
    type: String, // Hum image ka URL store karenge
    required: true,
  },
  liveLink: {
    type: String,
  },
  githubLink: {
    type: String,
  },
  isForSale: { type: Boolean, default: false }, 
  salePrice: { type: String, default: '' },     
  category: {
     type: String, default: '' 
    },      
 
  
  date: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;