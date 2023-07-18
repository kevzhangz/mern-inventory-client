import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthServices from "../../services/AuthServices";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    username: '',
    password: '',
    error: '',
    signedIn: false,
  })

  const handleSubmit = (event) => {
    event.preventDefault();

    AuthServices.register(values).then(data => {
      if(data.message){
        navigate('/')
      } else {
        setValues({...values, error: data.error })
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
          Registrasi
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {
            values.error && (<Typography component="p" color="error">
              {values.error}
            </Typography>)
          }
          <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              onChange={handleChange('name')}
              autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={handleChange('username')}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={handleChange('email')}
            autoFocus
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
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/" variant="body2">
                {"Sudah punya akun? Login di sini!"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}