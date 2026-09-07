

type Status = 
  | "Pending"
  | "In Progress"
  | "Completed";

type Assignment = {
  id: number
  title: string
  assignee: string
  status: Status
  dueDate: string
}

export type { Status, Assignment }