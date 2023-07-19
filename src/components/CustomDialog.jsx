import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'

const CustomDialog = (props) => {
  const { open, handleClose, component } = props
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>
        { component }
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomDialog