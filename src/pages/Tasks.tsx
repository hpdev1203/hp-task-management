import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { taskService } from '../services/taskService';

// Placeholder Icons
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const TaskIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08H13.5A2.25 2.25 0 0 0 11.25 6v1.5m7.5.375v10.5a2.25 2.25 0 0 1-2.25 2.25H6.75a2.25 2.25 0 0 1-2.25-2.25V6.375" />
 </svg>
);

const ProgressIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
 </svg>
);

const CompletedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
   <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  projectId: string;
  assignedTo: string;
  createdAt: string;
}

interface FormData {
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    assignee: '',
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await taskService.getAllTasks();
      setTasks(tasks);
    };
    fetchTasks();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      assignee: '',
    });
  };

 const handleEdit = (id: string) => {
  const task = tasks.find((t) => t.id === id);
  if (task) {
   setEditingTask(task);
   setFormData({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    assignee: task.assignedTo,
   });
   setOpen(true);
  }
 };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSubmit = () => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...formData, assignedTo: formData.assignee }
            : task
        )
      );
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        assignedTo: formData.assignee,
        dueDate: '2023-12-31',
        projectId: '1',
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
    }
    handleClose();
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus as Task['status'] } : task
      )
    );
  };

 // Stats data
 const stats = [
  {
   title: 'To Do',
   count: getTasksByStatus('todo').length,
   Icon: TaskIcon,
   bgColor: 'bg-gray-50',
   textColor: 'text-gray-600',
  },
  {
   title: 'In Progress',
   count: getTasksByStatus('in_progress').length,
   Icon: ProgressIcon,
   bgColor: 'bg-yellow-50',
   textColor: 'text-yellow-600',
  },
  {
   title: 'Completed',
   count: getTasksByStatus('completed').length,
   Icon: CompletedIcon,
   bgColor: 'bg-green-50',
   textColor: 'text-green-600',
  },
 ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="md:flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
            <p className="mt-2 text-sm text-gray-600">
              Track and manage your team's tasks
            </p>
          </div>
          <button
            onClick={handleOpen}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon />
            Add Task
          </button>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
         {stats.map((stat, index) => (
          <div
           key={index}
           className="bg-white overflow-hidden shadow rounded-lg transform transition hover:scale-[1.02] duration-150 ease-in-out"
          >
           <div className="p-5">
            <div className="flex items-center">
             <div className={`flex-shrink-0 ${stat.bgColor} ${stat.textColor} rounded-md p-3`}>
              <stat.Icon />
             </div>
             <div className="ml-5 w-0 flex-1">
              <dl>
               <dt className="text-sm font-medium text-gray-500 truncate">
                {stat.title}
               </dt>
               <dd className="text-3xl font-semibold text-gray-900">
                {stat.count}
               </dd>
              </dl>
             </div>
            </div>
           </div>
          </div>
         ))}
        </div>

        {/* Tasks Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Todo Column */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
              To Do
            </h2>
            <div className="space-y-4">
              {getTasksByStatus('todo').map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  category="To Do"
                  dueDate={task.dueDate}
                  projectId={task.projectId}
                  assignedTo={task.assignedTo}
                />
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
              In Progress
            </h2>
            <div className="space-y-4">
              {getTasksByStatus('in_progress').map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  category="In Progress"
                  dueDate={task.dueDate}
                  projectId={task.projectId}
                  assignedTo={task.assignedTo}
                />
              ))}
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
              Done
            </h2>
            <div className="space-y-4">
              {getTasksByStatus('completed').map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  category="Completed"
                  dueDate={task.dueDate}
                  projectId={task.projectId}
                  assignedTo={task.assignedTo}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Task Form Modal */}
        {open && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingTask ? 'Edit Task' : 'New Task'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                  <div className="mt-1">
                   <input
                    type="text"
                    name="title"
                    id="title"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                   />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <div className="mt-1">
                   <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                   />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1">
                   <select
                    id="status"
                    name="status"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
                   >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                   </select>
                  </div>
                 </div>

                 <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                  <div className="mt-1">
                   <select
                    id="priority"
                    name="priority"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                   >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                   </select>
                  </div>
                 </div>
                </div>

                <div>
                  <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">Assignee</label>
                  <div className="mt-1">
                   <input
                    type="text"
                    name="assignee"
                    id="assignee"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={formData.assignee}
                    onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                   />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={handleClose}
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {editingTask ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
