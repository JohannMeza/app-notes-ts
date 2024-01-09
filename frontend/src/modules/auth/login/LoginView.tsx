import { Button, Grid, Stack, Typography } from '@mui/material';
import { Controls } from '@src/shared/components/Controls';
import { APP_URL } from '@src/shared/constants/EnvConstants';
import { useAuthContext } from '@src/shared/hooks/useAuthContext';
import { ChangeEvent, FC, PropsWithChildren, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const stateInitial = {
  username: '',
  password: ''
};

export const LoginView: FC<PropsWithChildren> = () => {
  const [form, setForm] = useState(stateInitial);
  const { action, state } = useAuthContext();
  const navigate = useNavigate();
  const handleClickLogin = async (): Promise<void> => {
    const data = { username: form.username, password: form.password };
    const headers = { headers: { 'Content-Type': 'application/json' } };
    const response = await axios.post(`${APP_URL}/user/login`, data, headers);
    action.login(response.data.token);
  };

  const handleChangeForm = ({ target }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const { value, name } = target;
    setForm({ ...form, [name]: value });
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
            <Controls.Input   
              variant='primary' 
              size='medium' 
              label='Username' 
              name='username'
              onChange={handleChangeForm}
              value={form.username}
            />
          </Grid>
          <Grid item xs={12}> 
            <Controls.Input 
              variant='primary' 
              size='medium' 
              label='Password' 
              name='password'
              onChange={handleChangeForm} 
              type='password' 
              value={form.password}
            />
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