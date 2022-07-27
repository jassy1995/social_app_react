import React from "react";
// import useGlobalStore from "store/global.js";
import { Task } from "components/Task";
import { useGetTaskQuery } from "api/rent";

export default function Tasks() {
  // const tasks = useGlobalStore((state) => state.data.tasks);
  const { data: tasks, isLoading, refetch, isFetching } = useGetTaskQuery();

  return (
    <div
      className={`px-2 py-2  ring-1 ring-blue-400 mt-1 ${
        !tasks?.data?.length && "h-32"
      }`}
    >
      {isLoading ? (
        <span>Loading...</span>
      ) : !tasks?.data?.length && !isLoading ? (
        <div className="flex flex-col  relative">
          <div className="flex  absolute top-0 right-0">
            <button
              onClick={refetch}
              className="bg-red-400 text-sm rounded-full px-2 py-1 font-mono text-white"
            >
              refetch
            </button>
          </div>
          <div className="flex justify-center py-10  text-slate-400">
            No Task
          </div>
        </div>
      ) : (
        <div className="flex flex-col pb-2">
          <div className="flex items-end">
            <div>{isFetching ? "Fetching..." : null}</div>
          </div>

          {tasks?.data
            .sort((a, b) => b.id - a.id)
            .map((task) => (
              <Task key={task.id} task={task} />
            ))}
        </div>
      )}
    </div>
  );
}
