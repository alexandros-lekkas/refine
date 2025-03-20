export interface Task {
  id: string;
  title: string;
  description: string;
  courseCode: string;
  courseTitle: string;
  completed: boolean;
  dueDate?: string;
  plannedTime?: string;
  actualTime?: string;
  subtasks?: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
}
