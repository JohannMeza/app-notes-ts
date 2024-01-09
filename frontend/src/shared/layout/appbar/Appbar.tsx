import { FC } from 'react';
import { Avatar, Button, IconButton, Stack } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useAuthContext } from '@src/shared/hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

interface AppbarProps {
  handleOpen: () => void
}

export const Appbar: FC<AppbarProps> = ({ handleOpen }) => {
  const { state, action } = useAuthContext();
  const navigate = useNavigate();
  const logout = (): void => {
    action.logout();
    navigate('/login');
  };
  return (
    <Stack flexDirection="row" justifyContent="space-between" padding={2}>
      <IconButton onClick={handleOpen}>
        <KeyboardArrowLeftIcon />
      </IconButton>
      <Stack flexDirection="row" gap={3}>
        <Button variant='contained' onClick={logout}>Logout</Button>
        <Avatar>{state.user.username.charAt(0).toUpperCase()}</Avatar>
      </Stack>
    </Stack>
  );
};