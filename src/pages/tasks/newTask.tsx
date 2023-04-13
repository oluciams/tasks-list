import Layout from "@/components/Layout";
import { Task } from "@/interfaces/Tasks";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function NewTask() {

  const [task, setTask] = useState<Task>({
    title: "",
    description:""
  })

  const router = useRouter()

  const handleChangeTask = ({target: { name, value }}:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setTask({...task, [name]: value })
  }
 
  const createTask = async (task: Task) => {
    await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })
  }

  const updateTask = async (id: string, task: Task) => {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task)
    })
  }

  const handleDeleteTask = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE"
      });
      
      router.push("/")
    } catch (error) {
      console.log(error)
    }
  };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault()
     try {
       if (typeof router.query.id === "string") {
         updateTask(router.query.id, task)
       } else {
         await createTask(task)
       }
       router.push("/")
     } catch (error) {
      console.log(error)
     }
   }
  
  const loadTask = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`)
    const task = await response.json()
    setTask(
      {
        title: task.title,
        description: task.description
      })
  }
  
  useEffect(() => {
    if(typeof router.query.id === "string") loadTask(router.query.id);
    
  }, [router.query]);

  return (
    <Layout>
      <section className="mt-10 ml-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChangeTask}
              value={task.title}
              className="flex rounded-md ring-1 ring-gray-300 sm:max-w-md"
            />

            <div className="col-span-full border-b border-gray-900/10 pb-10">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  name="description"
                  rows={2}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                  value={task.description}
                  onChange={handleChangeTask}
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-4">
              {router.query.id ? (
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              )}
            </div>
          </div>
          {
            router.query.id && (
              <button
                type="submit"
                onClick={() => typeof router.query.id === "string" && handleDeleteTask(router.query.id)}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Delete
              </button>

            )
          }
        </form>
      </section>
    </Layout>
  );
}