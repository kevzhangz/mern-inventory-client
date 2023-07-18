import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import AuthServices from "../../services/AuthServices";
import auth from "../../helpers/auth";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    password: '',
    error: '',
    signedIn: false,
  })

  const handleSubmit = (event) => {
    event.preventDefault();

    AuthServices.login(values).then(data => {
      if(data.error){
        setValues({...values, error: data.error})
      } else {
        auth.authenticate(data, () => {
          navigate('/dashboard')
        })
      }
    })
  };

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {
            values.error ? (<Typography component="p" color="error">
              {values.error}
            </Typography>) : ''
          }
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange('username')}
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
            onChange={handleChange('password')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Belum punya akun? Registrasi di sini!"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login