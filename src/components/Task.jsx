import React from "react";
import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
// import useGlobalStore from "store/global";
import {
  useDeleteTask,
  useGetTaskQuery,
  useToggleRemainderMutation,
} from "api/rent";

export const Task = ({ task }) => {
  // const { toggleRemainder,deleteTask } = useGlobalStore((state) => ({
  //   toggleRemainder: state.toggleRemainder,
  //   deleteTask: state.deleteTask,
  // }));

  const { mutateAsync: deleteTask } = useDeleteTask();
  const { mutateAsync: toggleRemainder } = useToggleRemainderMutation();
  const { refetch } = useGetTaskQuery();

  const handleToggleRemainder = async (task) => {
    let payload = { ...task, remainder: !task.remainder };
    await toggleRemainder(payload);
    await refetch();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    await refetch();
  };

  return (
    <div
      className={`flex flex-col ring-1  ring-green-400  p-2 bg-slate-200 hover:bg-slate-300 mb-2 cursor-pointer ${
        task.remainder &&
        "border-l-4 rounded-tl-lg  border-green-700 cursor-pointer"
      }`}
      onDoubleClick={() => handleToggleRemainder(task)}
    >
      <div className="flex justify-between">
        <h3>{task?.text}</h3>
        <button className="text-red-500 mt-1 cursor:pointer">
          <FaTimes onClick={() => handleDelete(task.id)} />
        </button>
      </div>
      <p>{task?.day}</p>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
};
