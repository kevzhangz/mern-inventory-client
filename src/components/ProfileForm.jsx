import { Box, Button, TextField, Typography, Grid } from "@mui/material"

const ProfileForm = (props) => {
  const {handleSubmit, values, setValues, action }  = props

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value })
  }

  return(
    <Box>
      <Typography component="h1" align="left" variant="h5">
          {action} Profile
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {
          values?.error ? (<Typography component="p" color="error">
            {values.error}
          </Typography>) : ''
        }
        <Grid container columnSpacing={2}>
          <Grid item xs={9}>
            <Grid item xs={6}>
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
                value={values.username}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nama"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={handleChange('name')}
                value={values.name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                id="email"
                autoComplete="email"
                onChange={handleChange('email')}
                value={values.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="old_password"
                label="Password lama"
                id="old_password"
                type="password"
                autoComplete="old_password"
                onChange={handleChange('old_password')}
                value={values.old_password}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="new_password"
                label="Password baru"
                id="new_password"
                type="password"
                autoComplete="new_password"
                onChange={handleChange('new_password')}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, float: 'left' }}
        >
          {action}
        </Button>
      </Box>
    </Box>
  )
}

export default ProfileForm