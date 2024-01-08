import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CardContain = styled(Box)<{ color: string }>(({ theme, color }) => ({
  width: '100%',
  minHeight: '300px',
  background: theme.palette.secondary.main,
  borderTop: `8px solid ${color}`,
  color: theme.palette.text_light.main,
  borderRadius: 5,
  overflow: 'hidden',
  // padding: 15,
  position: 'relative',
  '& .popperButton': {
    opacity: 0,
    transition: 'opacity .5s ease'
  },
  '&:hover .popperButton': {
    opacity: 1
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '550px',
  },
}));