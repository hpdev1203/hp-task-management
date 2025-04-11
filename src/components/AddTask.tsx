import { useState, FormEvent } from 'react';
import { taskService } from '../services/taskService';
import { Task } from '../types/task';

interface AddTaskProps {
  onTaskAdded: (task: Task) => void;
}

export default function AddTask({ onTaskAdded }: AddTaskProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newTask = await taskService.addTask({
        title,
        description,
        status,
        priority,
        createdAt: new Date().toISOString()
      });
      
      onTaskAdded(newTask);
      
      // Reset form
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('medium');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
} 