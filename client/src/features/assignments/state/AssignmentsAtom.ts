import { atomWithStorage } from 'jotai/utils'
import type { Assignment } from '../types/assignment'


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

export const assignmentAtom = atomWithStorage<Assignment[]>('assignments', initialAssignments, undefined, { getOnInit: true})