import { useState, type SubmitEvent } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

const assignees = ['Unassigned', 'John Doe', 'Jane Smith', 'Alice Johnson']

type AssignmentFormProps = {
  onAddAssignment: (title: string, assignee: string) => void
}

function AssignmentForm({ onAddAssignment }: AssignmentFormProps) {
    const [title, setTitle] = useState('');
    const [assignee, setAssignee] = useState('Unassigned');

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmedTitle = title.trim();
        if(trimmedTitle === "") return;
        onAddAssignment(trimmedTitle, assignee);
        setTitle('');
        setAssignee('Unassigned');
    }

    return(
        <Stack component="form" 
        direction={{ xs: "column", sm: "row" }} 
        onSubmit={handleSubmit} 
        spacing={2}>
        <TextField label="New assignment title" value={title} sx={{ flexGrow: 1 }} onChange={(event) => setTitle(event.target.value)} />
        <TextField select label="Assignee" value={assignee} sx={{ flexGrow: 1 }} onChange={(event) => setAssignee(event.target.value)} >
            {assignees.map((assignee) => (
                <MenuItem key={assignee} value={assignee}>
                    {assignee}
                </MenuItem>
            ))}
        </TextField>
        <Button variant='contained' type="submit" sx={{ flexShrink: 0 }} disabled={title.trim() === ""}>
          Add assignment
        </Button>
      </Stack>
    )
}

export default AssignmentForm;