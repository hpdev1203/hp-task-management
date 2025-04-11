// Project Status can be: New, In Progress, Completed, Paused.
// Task Status can be: Not Started, In Progress, Completed, Canceled.
// Task Priority can be: High, Medium, Low.

export interface Project {
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  status: string;
  users: string[];
}

export interface Task {
  name: string;
  description: string;
  priority: string;
  status: string;
  assignee: string;
  dueDate?: Date;
  notes?: string[];
}