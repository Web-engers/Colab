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

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, signUp, signinWithGoogle } = useFirebase();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    signUp(name, email, password);
  };

  React.useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '80vh',
            borderRadius: 2,
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
          }}
        >
          {/* Left Side - Sign Up Form */}
          <Box
            sx={{
              width: '50%',
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ fontWeight: '600', mb: 2 }}>
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSignUp} sx={{ width: '100%', mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label={<Typography sx={{ color: theme.palette.text.secondary }}>Remember me</Typography>}
                />
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
                Sign Up
              </Button>
              <Typography variant="body2" sx={{ textAlign: 'center', color: theme.palette.text.secondary, mt: 1, mb: 1 }}>
                Already have an account?{' '}
                <Link href="/signin" sx={{ color: theme.palette.primary.main, fontWeight: '500' }}>
                  Sign in
                </Link>
              </Typography>
              <Divider sx={{ my: 2, color: '#ddd' }}>or</Divider>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                sx={{
                  py: 1.2,
                  color: '#DB4437',
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
                Sign up with Google
              </Button>
            </Box>
          </Box>

          {/* Right Side - Image */}
          <Box
            sx={{
              width: '50%',
              backgroundImage: 'url("/result_download.jpeg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpPage;