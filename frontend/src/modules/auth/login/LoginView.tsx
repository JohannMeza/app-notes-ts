import { Button, Grid, Stack, Typography } from '@mui/material';
import { Controls } from '@src/shared/components/Controls';
import { APP_URL } from '@src/shared/constants/EnvConstants';
import { useAuthContext } from '@src/shared/hooks/useAuthContext';
import { FC, PropsWithChildren, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginView: FC<PropsWithChildren> = () => {
  const { action, state } = useAuthContext();
  const navigate = useNavigate();
  const handleClickLogin = async (): Promise<void> => {
    const data = { username: 'johann', password: '123' };
    const headers = { headers: { 'Content-Type': 'application/json' } };
    const response = await axios.post(`${APP_URL}/user/login`, data, headers);
    action.login(response.data.token);
  };

  useEffect(() => {
    if (state.isAuthenticated) navigate('/dashboard/all-notes');
  }, [navigate, state.isAuthenticated]);

  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      <Stack bgcolor='secondary.main' padding={6} alignItems="center" borderRadius="15px">
        <Typography variant="h2" color="yellow.main" textAlign="center">NOTES APP</Typography>
        
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12}> 
            <Controls.Input variant='primary' size='medium' label='Username' />
          </Grid>
          <Grid item xs={12}> 
            <Controls.Input variant='primary' size='medium' label='Password' type='password' />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center"> 
            <Button variant='contained' onClick={handleClickLogin}>LOG IN</Button>
          </Grid>
        </Grid>

        <Stack alignItems="center">
          <Typography variant='body1' color="text_light.main">Do not you have an account yet</Typography>
          <Typography variant='body1' color="yellow.main">
            <Link to="/register">Register here</Link>
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};