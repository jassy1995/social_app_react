import React from "react";
import Header from "components/Header";
import Tasks from "components/Tasks";
import AddTask from "components/AddTask";
import useGlobalStore from "store/global";

export default function TaskTrackerPage() {
  const formIsOpen = useGlobalStore((state) => state.data.formIsOpen);
  return (
    <div className="w-1/3 mx-auto mt-20 px-1 py-1 ring-1 ring-slate-300">
      <Header title="task-tracker" />
      {formIsOpen && <AddTask />}
      <Tasks />
    </div>
  );
}
