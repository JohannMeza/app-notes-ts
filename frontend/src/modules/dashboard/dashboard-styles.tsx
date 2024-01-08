import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ColorsCardEnum } from './dashboard-types';

export const DashboardContain = styled(Box)<{ open: boolean }>(({ open }) => ({
  display: 'grid',
  gridTemplateColumns: open ? '0% 1fr' : '320px 1fr',
  transition: 'grid-template-columns ease 1s', 
  minHeight: '100vh',
  maxHeight: '100vh',
}));

export const DashboardContent = styled(Box)(() => ({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  height: '100%',
  maxHeight: '100vh',
}));

export const DashboardBody = styled(Box)(() => ({
  padding: 16,
  minHeight: '100%'
}));

export const ViewContain = styled(Box)(() => ({
  height: '100%',
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
}));

export const GridNotesContain = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: 15,
  overflow: 'auto',
  position: 'relative',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gridTemplateRows: 'repeat(auto-fill, minmax(300px, 300px))',
  height: '100%',
  maxHeight: '100%',
  marginTop: '15px', 
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  },
}));

export const ButtonContain = styled(Box)<{ opencolor: boolean }>(({ theme, opencolor }) => ({
  gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 50px))',
  background: theme.palette.secondary.main,
  top: opencolor ? '0' : '-100%',
  transition: 'top 1s ease',
  gridTemplateRows: '50px 50px',
  position: 'absolute',
  display: 'grid',
  zIndex: 10000,
  width: '100%',
  padding: '15px',
  gap: '5px',
}));

export const ButtonColor = styled(Button)<{ colorcard: ColorsCardEnum }>(({ colorcard }) => ({
  background: colorcard,
  width: '100%',
  minWidth: '100%',
  '&:hover': {
    background: colorcard,
  },
}));

export const ButtonColorClose = styled(Button)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center',
  width: '100%',
  minWidth: '100%',
  background: theme.palette.primary.main,
  '&:hover': {
    background: theme.palette.primary.main,
  },
}));