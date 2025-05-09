import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  CheckCircle as ReadIcon,
  Notifications as NotificationIcon,
} from '@mui/icons-material';

const Notification = ({ notification, onRead, onClick }) => {
  const handleRead = async () => {
    try {
      await fetch(`/api/notifications/${notification.id}/read`, {
        method: 'PUT',
      });
      onRead();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <Card
      sx={{
        background: 'rgba(26, 26, 46, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(5, 217, 232, 0.2)',
        mb: 2,
        opacity: notification.read ? 0.7 : 1,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <GitHubIcon sx={{ color: '#05d9e8', mr: 1 }} />
          <Typography variant="subtitle2" color="text.primary">
            {notification.type}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            {new Date(notification.createdAt).toLocaleDateString()}
          </Typography>
          {!notification.read && (
            <IconButton onClick={handleRead} size="small" sx={{ ml: 'auto' }}>
              <ReadIcon sx={{ color: '#05d9e8' }} />
            </IconButton>
          )}
        </Box>
        <Typography variant="body1" color="text.primary">
          {notification.content}
        </Typography>
        {notification.prompt && (
          <Button
            variant="text"
            startIcon={<NotificationIcon />}
            onClick={() => onClick(notification.prompt.id)}
            sx={{
              mt: 2,
              color: '#05d9e8',
              '&:hover': {
                background: 'rgba(5, 217, 232, 0.1)',
              },
            }}
          >
            View Prompt
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Notification;
