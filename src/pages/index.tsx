import Layout from "@/components/Layout";
import TaskList from "@/components/tasks/TaskList";
import { useRouter } from "next/router";
import { Task } from "src/interfaces/Tasks"

interface Props {
  tasks: Task[]
}

export default function Index({ tasks }: Props) {

  const router = useRouter()

  return (
    <Layout>
      {tasks.length === 0 ? (
        <section className="mt-12 flex items-center justify-center gap-x-4">
          <div>
            <h1>No tasks yet</h1>
            <button
              onClick={() => router.push("/tasks/newTask")}
              className="rounded-md bg-indigo-600 mt-4 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create one
            </button>
          </div>
        </section>
      ) : (
        <section className="container flex flex-wrap flex-row gap-6 mx-auto justify-center">
          <TaskList tasks={tasks} />
        </section>
      )}
    </Layout>
  );
}


export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/tasks")
  const tasks = await res.json()

  return {
    props: {
      tasks: tasks
    }
  }
  
}