import { Task } from "@/interfaces/Tasks";
import Router, { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

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

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault()
     try {
       await createTask(task)
       router.push("/")
     } catch (error) {
      console.log(error)
     }
   }

  return (
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
                defaultValue={""}
                onChange={handleChangeTask}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-4">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}