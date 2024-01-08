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

export const RegisterView: FC<PropsWithChildren> = () => {
  const { action, state } = useAuthContext();
  const [form, setForm] = useState(stateInitial);
  const navigate = useNavigate();
  
  const handleChangeForm = ({ target }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const { value, name } = target;
    setForm({ ...form, [name]: value });
  };

  const handleSaveUser = async (): Promise<void> => {
    const data = { username: form.username, password: form.password };
    const headers = { headers: { 'Content-Type': 'application/json' } };
    const response = await axios.post(`${APP_URL}/user/register`, data, headers);
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
            <Controls.Input variant='primary' size='medium' label='Username' name="username" value={form.username} onChange={handleChangeForm} />
          </Grid>
          <Grid item xs={12}> 
            <Controls.Input variant='primary' size='medium' label='Password' name="password" value={form.password} type='password' onChange={handleChangeForm} />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center"> 
            <Button variant='contained' onClick={handleSaveUser}>REGISTER</Button>
          </Grid>
        </Grid>

        <Stack alignItems="center">
          <Typography variant='body1' color="text_light.main">You already have an account</Typography>
          <Typography variant='body1' color="yellow.main">
            <Link to="/login">Log in here</Link>
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};