import { Button, Grid, Typography } from "@mui/material"
import Table from "./Table"

const CustomTableView = (props) => {
  const { handleOpen } = props

  return (
    <div>
      <Grid container spacing="1">
        <Grid item xs={8}>
          <Typography variant="h5" sx={{ textAlign: 'left' }}>
            Data {props.menu}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button onClick={() => {handleOpen('create')}} variant="contained" sx={{ float: 'right' }}>Tambah Data</Button>
        </Grid>
      </Grid>
      <Table data={props.data} columns={props.columns}/>
    </div>
  )
}

export default CustomTableView