
import mongoose from './index.js';

const taskSchema = new mongoose.Schema(
  {
    taskDetails: {
      type: String,
      required: true,
    },
    projectTitle: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    frontendUrl: {
      type: String,
    },
    backendUrl: {
      type: String,
    },
    dateAssigned: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: 'pending',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
  },
  {
    collection: 'tasks',
    versionKey: false,
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
