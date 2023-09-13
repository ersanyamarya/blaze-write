import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import * as React from 'react'
import { useEffect, useState } from 'react'

interface AddTopicDialogProps
  extends React.PropsWithChildren<{
    name?: string
    open: boolean
    handleClose: () => void
    handleAddTopic: (topic: string) => void
  }> {
  name?: string
  open: boolean
  handleClose: () => void
  handleAddTopic: (topic: string) => void
}

export default function AddTopicDialog({ name, open, handleClose, handleAddTopic }: AddTopicDialogProps) {
  const [topic, setTopic] = useState<string>('')

  useEffect(() => {
    setTopic(name || '')
  }, [name])

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new Topic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Adding a new topic will not automatically start researching it. You will need to start researching it
          </DialogContentText>
          <TextField
            value={topic}
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
