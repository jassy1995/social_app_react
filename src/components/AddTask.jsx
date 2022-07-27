import React, { useState } from "react";
// import useGlobalStore from "store/global";
import { useAddTaskMutation, useGetTaskQuery } from "api/rent";

const AddTask = () => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [remainder, setRemainder] = useState(false);

  // const { tasks, addTask } = useGlobalStore((state) => ({
  //   tasks: state.data.tasks,
  //   addTask: state.addTask,
  // }));

  const { mutateAsync: addTask, isLoading } = useAddTaskMutation();
  const { refetch } = useGetTaskQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { text, day, remainder };
    await addTask(task);
    await refetch();
    setText("");
    setDay("");
    setRemainder(false);
  };

  return (
    <form
      className="px-2 py-2  ring-1 ring-yellow-400 mt-1"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-1">
          <label htmlFor="task" className="font-mono">
            Task
          </label>
          <input
            value={text}
            type="text"
            name="task"
            id="task"
            className="border-2 border-slate-300 outline-none bg-gray-200 
            focus:bg-white focus:border-blue-300 p-1 focus:shadow-md
            rounded-sm text-sm"
            placeholder="add your text here"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="task" className="font-mono">
            Date
          </label>
          <input
            value={day}
            type="date"
            name="task"
            id="task"
            className="border-2 border-slate-300 outline-none bg-gray-200 
            focus:bg-white focus:border-blue-300 p-1 focus:shadow-md
            rounded-sm text-sm"
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3">
          <label htmlFor="task" className="font-mono">
            Remainder
          </label>
          <input
            checked={remainder}
            type="checkbox"
            name="task"
            id="task"
            className="mt-1"
            onChange={(e) => setRemainder(e.currentTarget.checked)}
          />
        </div>
        <input
          type="submit"
          value={isLoading ? "Adding..." : "Submit"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300 disabled:shadow-none disabled:cursor-not-allowed"
          disabled={!text || !day}
        />
      </div>
    </form>
  );
};

export default AddTask;
