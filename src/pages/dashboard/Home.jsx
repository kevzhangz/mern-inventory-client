import Typography from '@mui/material/Typography';
import { useState } from 'react';
import auth from '../../helpers/auth';

export default function Home() {
  const [user] = useState({
    name: auth.isAuthenticated().user.name
  })

  return(
    <div>
      <Typography variant="h5" align="left">
        Selamat Datang Kembali, {user.name}
      </Typography>
    </div>
  )
}