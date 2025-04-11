import React from 'react';
import { Card, CardContent, Typography, IconButton, Box, Chip } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

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
        return 'success';
      case 'completed':
        return 'info';
      case 'on-hold':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Box>
            {onEdit && (
              <IconButton onClick={() => onEdit(id)} size="small">
                <Edit />
              </IconButton>
            )}
            {onDelete && (
              <IconButton onClick={() => onDelete(id)} size="small" color="error">
                <Delete />
              </IconButton>
            )}
          </Box>
        </Box>
        <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
          {description}
        </Typography>
        <Chip
          label={status}
          color={getStatusColor(status)}
          size="small"
        />
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
