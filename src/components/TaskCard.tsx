import React from 'react';
import { taskService } from '../services/taskService';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: string) => void;
  onDelete: (taskId: string) => void;
  category: string;
  dueDate: string;
  projectId: string;
  assignedTo: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onDelete, category, dueDate, projectId, assignedTo }) => {
  const handleStatusChange = async (newStatus: string) => {
    try {
      await taskService.updateTask(task.id, { status: newStatus });
      onStatusChange(task.id, newStatus);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await taskService.deleteTask(task.id);
      onDelete(task.id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-card p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>
          <div className="mt-2">
            <span className={`px-2 py-1 rounded text-sm ${
              task.priority === 'high' ? 'bg-red-100 text-red-800' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {task.priority}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="border rounded p-1"
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
