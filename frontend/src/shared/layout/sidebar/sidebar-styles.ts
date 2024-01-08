import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SidebarContain = styled(Box)<{ open: boolean }>(({ theme, open }) => ({
  width: '100%',
  minWidth: '320px',
  height: '100%',
  maxHeight: '100vh',
  position: 'relative',
  transform: open ? 'translateX(-100%)' : 'translateX(0%)',
  // left: open ? '-100%' : '0%',
  background: theme.palette.secondary.main,
  display: 'grid',
  gridTemplateRows: 'repeat(4, 1fr)',
  borderRadius: '0 15px 15px 0',
  overflow: 'hidden',
  transition: 'transform ease 1s, left ease 1s', 
  '& a': {
    color: theme.palette.text_light.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background linear .7s, color linear 1s',
    textDecoration: 'none'
  }
}));