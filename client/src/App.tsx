import { useState } from 'react'
import type { Assignment } from './types/assignment'
import AssignmentListItem from './components/AssignmentListItem'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AssignmentForm from './components/AssignmentForm'

const initialAssignments: Assignment[] = [
  {
    id: 1,
    title: "Fix leaky faucet",
    assignee: "John Doe",
    status: "Completed",
    dueDate: "2024-06-30"
  },
  {
    id: 2,
    title: "Replace air filters",
    assignee: "Jane Smith",
    status: "In Progress",
    dueDate: "2024-07-05"
  },
  {
    id: 3,
    title: "Clean gutters",
    assignee: "Alice Johnson",
    status: "Completed",
    dueDate: "2024-07-10"
  }
]

function App() {
  const [showCompleted, setShowCompleted] = useState(true)
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments)
  const visibleAssignments = showCompleted ? assignments : assignments.filter(assignment => assignment.status !== "Completed")
  
  function handleAddAssignment(title: string, assignee: string) {
    const trimmedTitle = title.trim()
    if(trimmedTitle === "") return
    const newAssignment: Assignment = {
      id: Date.now(),
      title: trimmedTitle,
      assignee: assignee,
      status: "Pending",
      dueDate: new Date().toISOString().slice(0, 10)
    }
    setAssignments((current) => [...current, newAssignment])
  }

  function handleCompleteAssignment(assignmentId: number){
    setAssignments((current) =>
       current.map(assignment =>
         assignment.id === assignmentId 
         ? { ...assignment, status: "Completed" } 
         : assignment
        )
      )
  }

  return (<Container component="main" maxWidth="md">
    <Stack spacing={3} sx={{ py: 4 }}>
      <Typography 
        component="h1" 
        variant="h3">
          Work Assignment Manager
      </Typography>
      <Typography component="p" variant="body1">Track and assign maintenance work.</Typography>
      <Button variant='outlined' onClick={() => setShowCompleted((current) => !current)}>
        {showCompleted ? "Hide Completed" : "Show Completed"}
      </Button>
      <AssignmentForm onAddAssignment={handleAddAssignment} />
      <section>
        <Typography component="h2" variant="h4">Assignments</Typography>
        <Stack component="ul" spacing={2} sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {visibleAssignments.map(assignment => (
            <AssignmentListItem key={assignment.id} assignment={assignment} onComplete={handleCompleteAssignment} />
          ))}
        </Stack>
      </section>
    </Stack>
  </Container>)
}

export default App
