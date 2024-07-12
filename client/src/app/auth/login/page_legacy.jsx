"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Google as GoogleIcon, Twitter as TwitterIcon } from '@mui/icons-material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5173/auth/login', {
        email,
        password,
        remember_me: rememberMe,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setEmail('');
      setPassword('');
      setErrorMessage('');
      router.push('/filters');
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.error || 'Internal server error';
      setErrorMessage(message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          width: '70%',
          height: '60vh',
          marginTop: '20vh',
          marginLeft: '15%',
          backgroundColor: '#f4f6f8',
          borderRadius: 2,
          boxShadow: 3,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url('https://img.freepik.com/premium-vector/team-young-professionals-made-up-men-women_1343-677.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box
          sx={{
            flex: 1,
            padding: 4,
            backgroundColor: '#fff',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id='email'
              label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin='normal'
              variant='outlined'
              InputProps={{ style: { backgroundColor: '#e7f3ff' } }}
            />
            <TextField
              fullWidth
              id='password'
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin='normal'
              variant='outlined'
              InputProps={{ style: { backgroundColor: '#e7f3ff' } }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color='primary'
                />
              }
              label='Remember Me'
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant='outlined'
                startIcon={<GoogleIcon />}
                sx={{ flex: 1, mr: 1 }}
                onClick={() => window.location.href = 'http://localhost:8000/auth/google'}
              >
                Google
              </Button>
              <Button
                variant='outlined'
                startIcon={<TwitterIcon />}
                sx={{ flex: 1, ml: 1 }}
              >
                Twitter
              </Button>
            </Box>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              sx={{ mt: 2 }}
            >
              Log In
            </Button>
          </form>
          {errorMessage && (
            <Typography variant="body1" color="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
