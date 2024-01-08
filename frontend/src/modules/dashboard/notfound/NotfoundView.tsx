import { Box, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export const NotfoundView: FC<PropsWithChildren> = () => (
  <Box>
    <Typography variant='h1'>Error 404</Typography>
    <Typography variant='h2'>Page not found</Typography>
  </Box>
);