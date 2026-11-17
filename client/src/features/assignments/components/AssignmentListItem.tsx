import type { Assignment, Status } from '../types/assignment'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { formatDate } from '../utilities/formatDate'
import Button from '@mui/material/Button'

type AssignmentListItemProps ={
    assignment: Assignment
    onComplete: (assignmentId: number) => void
}

function getStatusChipColor(status: Status) {
    switch (status){
        case "Pending":
            return "warning"
        case "In Progress":
            return "info"
        case "Completed":
            return "success"
    } 
}

function AssignmentListItem({ assignment, onComplete }: AssignmentListItemProps) {
    return (
        <li>
            <Paper elevation={2} sx={{ p:2 }}>
                <Stack spacing={1} >
                    <Stack direction="row" sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Typography component="h3" variant="h6">{assignment.title}</Typography>
                        <Chip label={assignment.status} color={getStatusChipColor(assignment.status)} size="small" />
                    </Stack>
                    <Typography component="p" variant="body2">Assignee: {assignment.assignee}</Typography>
                    <Typography component="p" variant="body2">Due Date: {formatDate(assignment.dueDate)}</Typography>
                    {assignment.status !== "Completed" && (
                        <Button variant="outlined" color="success" size="small" sx={{ alignSelf: 'flex-start' }} onClick={() => onComplete(assignment.id)}>
                            Mark as Complete
                        </Button>
                    )}
                </Stack>
            </Paper>
        </li>
    )
}

export default AssignmentListItem