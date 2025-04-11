import React from 'react';

// Placeholder SVG Icons (Replace with your preferred icon library e.g., Heroicons)
const TaskIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08H13.5A2.25 2.25 0 0 0 11.25 6v1.5M18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
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

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const EmptyStateIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-300">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 4.5 3.75h15A2.25 2.25 0 0 1 21.75 6v3.776" />
 </svg>
);


const Dashboard: React.FC = () => {
  // Dummy data - replace with actual data fetching
  const totalTasks = 0;
  const inProgressTasks = 0;
  const completedTasks = 0;

  const stats = [
    { title: 'Total Tasks', count: totalTasks, Icon: TaskIcon, bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { title: 'In Progress', count: inProgressTasks, Icon: ProgressIcon, bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
    { title: 'Completed', count: completedTasks, Icon: CompletedIcon, bgColor: 'bg-green-50', textColor: 'text-green-600' }
  ];

  // Example state for active category - manage this with useState
  const [activeCategory, setActiveCategory] = React.useState('All');
  const categories = ['All', 'Work', 'Personal', 'Shopping', 'Health', 'Education'];

  const hasTasks = totalTasks > 0; // Determine if there are any tasks

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          {/* Consider adding a more descriptive title or breadcrumbs */}
          <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
           <p className="mt-1 text-sm text-gray-500">Overview of your tasks and projects.</p>
        </div>
        <button
         type="button"
         // onClick={() => {/* Handle Add Task Action */}}
         className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 ease-in-out"
        >
          <PlusIcon />
          Add New Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white overflow-hidden shadow rounded-lg transform transition hover:scale-[1.02] duration-150 ease-in-out">
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
             {/* Optional: Add a footer link
             <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> View all </a>
                 </div>
             </div>
            */}
          </div>
        ))}
      </div>

      {/* Category Filters */}
      <div className="mb-6">
         <h2 className="text-lg font-medium text-gray-900 mb-3">Filter by Category</h2>
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
            <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)} // Update state on click
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out ${
                activeCategory === category
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
            >
                {category}
            </button>
            ))}
        </div>
      </div>

      {/* Task List Area or Empty State */}
      <div>
        {hasTasks ? (
          // Render Task List Component Here (e.g., <TaskList category={activeCategory} />)
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            Task List Placeholder (Implement based on your TaskCard/Data)
          </div>
        ) : (
          // Empty State
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center mt-8">
             <div className="flex justify-center mb-4">
               <EmptyStateIcon />
             </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tasks Yet!</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">It looks a bit empty here. Start organizing your work by adding your first task.</p>
            <button
             type="button"
             // onClick={() => {/* Handle Add Task Action */}}
             className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 ease-in-out"
            >
              <PlusIcon />
              Add Your First Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
