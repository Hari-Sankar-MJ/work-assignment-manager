import type { Assignment } from '../types/assignment'

type AssignmentListItemProps ={
    assignment: Assignment
}

function AssignmentListItem({ assignment }: AssignmentListItemProps) {
    return (
        <li>
            <h3>{assignment.title}</h3>
            <p>Assignee: {assignment.assignee}</p>
            <p>Status: {assignment.status}</p>
            <p>Due Date: {assignment.dueDate}</p>
        </li>
    )
}

export default AssignmentListItem