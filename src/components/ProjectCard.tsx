import React from 'react';

// Placeholder Icons (Replace with your preferred icon library)
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

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  status,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (status: 'active' | 'completed' | 'on-hold') => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-indigo-100 text-indigo-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex space-x-2">
            {onEdit && (
              <button
                onClick={() => onEdit(id)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-150"
              >
                <EditIcon />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-150"
              >
                <DeleteIcon />
              </button>
            )}
          </div>
        </div>
        <p className="text-gray-600 mb-3">{description}</p>
        <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;