import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Checkbox, FormControlLabel, Divider, Link } from '@mui/material';
import { Google } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/poppins';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    primary: {
      main: '#3f51b5',
      dark: '#303f9f',
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
  },
});

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, signIn, signinWithGoogle } = useFirebase();
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard'); // Redirects to dashboard after successful login
    }
  }, [user, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            padding: 4,
            borderRadius: 3,
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#FFFFFF',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Box sx={{ mb: 2 }}>
            <img src="/path/to/logo.png" alt="Logo" style={{ height: '40px' }} />
          </Box>
          <Typography component="h1" variant="h5" sx={{ fontWeight: '600', mb: 2 }}>
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSignIn} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={<Typography sx={{ color: theme.palette.text.secondary }}>Remember me</Typography>}
              />
              <Link href="#" variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: '500' }}>
                Forgot password?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1rem',
                backgroundColor: theme.palette.primary.main,
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Sign In
            </Button>
            <Typography variant="body2" sx={{ textAlign: 'center', color: theme.palette.text.secondary, mt: 1, mb: 1 }}>
              Don't have an account?{' '}
              <Link href="/signup" sx={{ color: theme.palette.primary.main, fontWeight: '500' }}>
                Sign up
              </Link>
            </Typography>
            <Divider sx={{ my: 2, color: '#ddd' }}>or</Divider>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              sx={{
                py: 1.2,
                color: '#DB4437', // Google's red color
                borderColor: '#DB4437',
                fontWeight: '500',
                backgroundColor: 'rgba(219, 68, 55, 0.1)',
                '&:hover': {
                  borderColor: '#DB4437',
                  backgroundColor: 'rgba(219, 68, 55, 0.2)',
                },
              }}
              onClick={signinWithGoogle}
            >
              Sign in with Google
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignInPage;
