import React from 'react';
import { taskService } from '../services/taskService';
import { Task } from '../types/task';

// Placeholder Icons (Replace with your preferred icon library)
const PriorityHighIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 text-red-500">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.548 0-.823.328-.633.795l1.744 4.359a.75.75 0 0 1-.452.955c-.15.037-.304.074-.461.113-.16.04-.319.08-.474.118l-.243.06a.75.75 0 0 1-.634-.243l-1.297-1.298a.75.75 0 0 1 1.06-1.06l.044.044.266.265c.157.157.393.157.55 0l1.297-1.297a.75.75 0 0 1 1.06 1.06l-.265.266.044.043c.157.157.157.393 0 .55l-.043.044-.266.265a.75.75 0 0 1-.671 1.284c.095-.024.192-.048.291-.073.131-.033.263-.066.396-.1a.75.75 0 0 1 .404-1.164l-1.744-4.359c-.19-.467.086-.795.633-.795h.002Zm5.25 0c-.548 0-.823.328-.633.795l1.744 4.359a.75.75 0 0 1-.452.955c-.15.037-.304.074-.461.113-.16.04-.319.08-.474.118l-.243.06a.75.75 0 0 1-.634-.243l-1.297-1.298a.75.75 0 0 1 1.06-1.06l.044.044.266.265c.157.157.393.157.55 0l1.297-1.297a.75.75 0 0 1 1.06 1.06l-.265.266.044.043c.157.157.157.393 0 .55l-.043.044-.266.265a.75.75 0 0 1-.671 1.284c.095-.024.192-.048.291-.073.131-.033.263-.066.396-.1a.75.75 0 0 1 .404-1.164l-1.744-4.359c-.19-.467.086-.795.633-.795h.002Z" clipRule="evenodd" />
  </svg>
);

const PriorityMediumIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 text-yellow-500">
    <path fillRule="evenodd" d="M9.315 7.585a1.5 1.5 0 0 0-2.12 2.122L12.5 17.25a.75.75 0 0 0 1.499 0l5.205-7.543a1.5 1.5 0 1 0-2.12-2.122L12.5 14.25a.75.75 0 0 0-1.499 0L9.315 7.585ZM3 9.75a3 3 0 0 1 6 0v3a3 3 0 0 1-6 0v-3Zm12 0a3 3 0 0 1 6 0v3a3 3 0 0 1-6 0v-3Z" clipRule="evenodd" />
  </svg>
);

const PriorityLowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 text-green-500">
    <path fillRule="evenodd" d="M3 15.75a3 3 0 0 1 6 0v-3a3 3 0 0 1-6 0v3Zm13.5-5.25a3 3 0 0 1 3 3v-3a3 3 0 0 1-3-3v3ZM6.75 7.5a3 3 0 0 1 6 0v-3a3 3 0 0 1-6 0v3Zm13.5 8.25a3 3 0 0 1 3 3v-3a3 3 0 0 1-3-3v3Z" clipRule="evenodd" />
  </svg>
);

const EditIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.687a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v5.625a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h5.625" />
 </svg>
);

const DeleteIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m3.452 0L21 9m-1.812 0h1.684a1.5 1.5 0 0 1 1.5 1.5v1.068a12.043 12.043 0 0 1-.449 3.026l-.26 1.574a.75.75 0 0 1-.744.684H5.204a.75.75 0 0 1-.744-.684l-.26-1.574A12.042 12.042 0 0 1 4.5 13.568V12.5a1.5 1.5 0 0 1 1.5-1.5h1.684m5.832 0h3.432M6 18a3 3 0 0 0 3-3H7.5a3 3 0 0 1-3 3h1.5Zm6 0h-1.5a3 3 0 0 1-3-3H15a3 3 0 0 0 3 3h-1.5Z" />
 </svg>
);

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  category: string;
  dueDate: string;
  projectId: string;
  assignedTo: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onDelete, category, dueDate, projectId, assignedTo, onEdit }) => {
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

  const handleEdit = () => {
    onEdit(task.id);
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <PriorityHighIcon />;
      case 'medium':
        return <PriorityMediumIcon />;
      case 'low':
        return <PriorityLowIcon />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="p-4">
        {/* Task Title and Description */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
        <p className="text-gray-600 mb-3">{task.description}</p>

        {/* Task Metadata (Priority, Due Date) */}
        <div className="flex items-center mb-3">
          {getPriorityIcon(task.priority)}
          <span className="text-sm text-gray-500">{task.priority} priority</span>
          {dueDate && (
            <span className="ml-4 text-sm text-gray-500">
              Due: {dueDate}
            </span>
          )}
        </div>

        {/* Task Status Actions */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={() => handleStatusChange('todo')}
              className={`px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-150 ${task.status === 'todo' ? 'bg-indigo-200 text-indigo-700' : ''}`}
            >
              To Do
            </button>
            <button
              onClick={() => handleStatusChange('in_progress')}
              className={`px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-150 ${task.status === 'in-progress' ? 'bg-indigo-200 text-indigo-700' : ''}`}
            >
              In Progress
            </button>
            <button
              onClick={() => handleStatusChange('completed')}
              className={`px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-150 ${task.status === 'completed' ? 'bg-indigo-200 text-indigo-700' : ''}`}
            >
              Completed
            </button>
          </div>

          {/* Task Actions (Edit, Delete) */}
          <div className="flex space-x-2">
           <button
            onClick={handleEdit}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-150"
           >
            <EditIcon />
           </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 transition-colors duration-150"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;