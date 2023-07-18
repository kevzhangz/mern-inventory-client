import { Button, Grid, Typography } from "@mui/material"
import Table from "./Table"
import { Link } from "react-router-dom"

const CustomTableView = (props) => {
  return (
    <div>
      <Grid container spacing="1">
        <Grid item xs={8}>
          <Typography variant="h5" sx={{ textAlign: 'left' }}>
            Data {props.menu}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button component={Link} to="new" variant="contained" sx={{ float: 'right' }}>Tambah Data</Button>
        </Grid>
      </Grid>
      <Table data={props.data} columns={props.columns}/>
    </div>
  )
}

export default CustomTableView