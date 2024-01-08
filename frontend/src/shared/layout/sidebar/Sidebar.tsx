import { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { SidebarContain } from './sidebar-styles';
import { NavLink } from 'react-router-dom';
import { CSSProperties } from 'styled-components';

interface StyleLinKProps { isActive: boolean }
interface SidebarProps { open: boolean }

export const SidebarView: FC<SidebarProps> = ({ open }) => {
  const theme = useTheme();
  
  const styleLinkActive = ({ isActive }: StyleLinKProps): CSSProperties => ({
    background: isActive ? theme.palette.green_pastel.main : '',
    color: isActive ? theme.palette.text_dark.main : '',
    viewTransitionName: 'slide',
  });
  
  return (
    <SidebarContain component="ul" open={open}>
      <NavLink to="all-notes" style={styleLinkActive}>
        <Box component="li">
          <Typography variant='h2'>All Notes</Typography>
        </Box>
      </NavLink>
      <NavLink to="categories" style={styleLinkActive}>
        <Box component="li">
          <Typography variant='h2'>Categories</Typography>
        </Box>
      </NavLink>
      <NavLink to="archived" style={styleLinkActive}>
        <Box component="li">
          <Typography variant='h2'>Archived</Typography>
        </Box>
      </NavLink>
    </SidebarContain>
  );
};