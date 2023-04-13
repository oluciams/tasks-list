import { Task } from "@/interfaces/Tasks";
import { Router, useRouter } from "next/router";

interface Props {
  tasks: Task[];
}

export default function TaskList({ tasks }: Props) {

  const router = useRouter()

  return (
    <section>
      {
        tasks.map((task) => (
          <div key={task.id} onClick={() => router.push(`/tasks/edit/${task.id}`)} className="border">
            <div className="card-body">
              <h5 className="card-title">{task.title}</h5>
              <p className="card-text">{task.description}</p>
              {task.created_on && (
                <span>{new Date(task.created_on).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        ))}
    </section>
  );
} 