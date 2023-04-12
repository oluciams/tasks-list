import { Task } from "@/interfaces/Tasks";

interface Props {
  tasks: Task[];
}

export default function TaskList({ tasks }: Props) {
  console.log(tasks)

  return (
    <section>
      {
        tasks.map((task) => (
          <>
            <div key={task.id} className="border">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                {task.created_on && (
                  <span>{new Date(task.created_on).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          </>
        ))}
    </section>
  );
} 