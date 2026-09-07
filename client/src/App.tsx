import './App.css'
import type { Assignment } from './types/assignment'
import AssignmentListItem from './components/AssignmentListItem'

const assignments: Assignment[] = [
  {
    id: 1,
    title: "Fix leaky faucet",
    assignee: "John Doe",
    status: "Pending",
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
    status: "Pending",
    dueDate: "2024-07-10"
  }
]

function App() {
  return (<main>
    <h1>Work Assignment Manager</h1>
    <p>Track and assign maintenance work.</p>
    <section>
      <h2>Assignments</h2>
      <ul>
        {assignments.map(assignment => (
          <AssignmentListItem key={assignment.id} assignment={assignment} />
        ))}
      </ul>
    </section>
  </main>)
}

export default App
