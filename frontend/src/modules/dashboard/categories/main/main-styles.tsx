import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const GridContain = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: 15,
  overflow: 'auto',
  position: 'relative',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gridTemplateRows: 'repeat(auto-fill, minmax(150px, 150px))',
  height: '100%',
  maxHeight: '100%',
  marginTop: '15px', 
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  },
}));

export const CardCategorie = styled(Button)(({ theme }) => ({
  background: theme.palette.secondary.main,
  width: '100%',
  height: '100%',
  minHeight: '150px',
  position: 'relative',
  '& .popperButton': {
    opacity: 0,
    transition: 'opacity .5s ease'
  },
  '&:hover .popperButton': {
    opacity: 1
  },
  '&:hover': {
    background: theme.palette.secondary.main,
  }
}));