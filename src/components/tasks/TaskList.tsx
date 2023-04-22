import { Task } from "@/interfaces/Tasks";
import { Router, useRouter } from "next/router";

interface Props {
  tasks: Task[];
}

export default function TaskList({ tasks }: Props) {

  const router = useRouter()

  return (
    <>
      {tasks.map((task) => (
        <div
          key={task.id}
          onClick={() => router.push(`/tasks/edit/${task.id}`)}
          className="bg-gray-50 my-4 w-48 rounded-xl ring-2 ring-gray-200 shadow-xl sm:mt-10 lg:mx-8 lg:flex lg:max-w-none"
        >
          <div className="p-2 sm:p-4 lg:flex-auto">
            <h5 className="text-xl font-bold tracking-tight text-gray-900">
              {task.title}
            </h5>
            <p className="mt-4 text-base leading-7 text-gray-600">
              {task.description}
            </p>
            {task.created_on && (
              <span className="mt-6 text-xs leading-5 text-gray-600">
                {new Date(task.created_on).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      ))}
    </>
  );
} 