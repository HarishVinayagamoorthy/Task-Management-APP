
import User from '../models/user.js';
import Task from '../models/taskmodel.js';

const TaskController = {
  assignTask: async (req, res) => {
    try {
        const { email, taskDetails, projectTitle, projectDescription } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new task
        const task = new Task({
            taskDetails,
            projectTitle,
            projectDescription,
            assignedTo: user._id,
        });
        await task.save();

        // Update the user's tasks array
        if (!user.tasks) {
            user.tasks = []; // Initialize tasks array if not already initialized
        }
        user.tasks.push(task._id); // Add the task to the user's tasks array
        await user.save();

        res.status(200).json({ message: 'Task assigned successfully' });
    } catch (error) {
        console.error('Error assigning task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
},

  

  getTasks : async (req, res) => {
    try {
      const { email } = req.params;
      const user = await User.findOne({ email }).populate('tasks');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  
  submitTask: async (req, res) => {
    try {
      const { email,  endTime,taskId, frontendUrl, backendUrl, title } = req.body;
  
      // Find the task by taskId and update its details
      const task = await Task.findByIdAndUpdate(
        taskId,
        {  endTime,frontendUrl, backendUrl, title, status: 'submitted' },
        { new: true }
      );
  
      // Check if the task was found
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Respond with success message
      res.status(200).json({ message: 'Task submitted successfully' });
    } catch (error) {
      console.error('Error submitting task:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  

 startwork:async (req, res) => {
  try {
    const { taskId, startTime } = req.body;
    
    // Find the task by taskId
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task status and start time
    task.status = 'processing';
    task.startTime = startTime;
    
    // Save the updated task
    await task.save();

    res.status(200).json({ message: 'Work started on task', task });
  } catch (error) {
    console.error('Error starting work:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

};

export default TaskController;
