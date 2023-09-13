import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface AddTopicDialogProps
  extends React.PropsWithChildren<{
    open: boolean
    handleClose: () => void
    handleAddTopic: (topic: string) => void
  }> {
  open: boolean
  handleClose: () => void
  handleAddTopic: (topic: string) => void
}

export default function AddTopicDialog({ open, handleClose, handleAddTopic }: AddTopicDialogProps) {
  const [topic, setTopic] = React.useState('')
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new Topic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Adding a new topic will not automatically start researching it. You will need to start researching it
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Topic"
            type="text"
            fullWidth
            variant="outlined"
            onChange={e => setTopic(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleAddTopic(topic)}>Add Topic</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
