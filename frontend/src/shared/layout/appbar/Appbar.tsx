import { FC } from 'react';
import { Avatar, IconButton, Stack } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface AppbarProps {
  handleOpen: () => void
}

export const Appbar: FC<AppbarProps> = ({ handleOpen }) => (
  <Stack flexDirection="row" justifyContent="space-between" padding={2}>
    <IconButton onClick={handleOpen}>
      <KeyboardArrowLeftIcon />
    </IconButton>
    <Avatar>J</Avatar>
  </Stack>
);