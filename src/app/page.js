"use client";
import TaskList from "@/components/TaskList";
import next from "next";
import { loadComponents } from "next/dist/server/load-components";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const [nextId, setNextId] =useState(1);
  
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
    const maxId = savedTasks.reduce((max, task) => Math.max(max, task.id), 0);
    setNextId(maxId +1);
  }, []);
  
  const addTask = () => {
    console.log("Before" + tasks);
    console.log("NewTask:" + newTask);
    const newTaskObj = {
      id: nextId,
      title: newTask,
      description: '',
    };
    const updatedTasks = [ ...tasks, newTaskObj];
    setTasks(updatedTasks);
    console.log("After" + updatedTasks);
    setNewTask('');

    setNextId(nextId +1)
    localStorage.setItem('task',JSON.stringify(updatedTasks));

};

const handleDelete = (index) =>{
  const newTask = tasks.filter((_, i) => i !== index);
  setTasks(newTaskObj);
  localStorage.setItem('tasks', JSON.stringify(newTaskObj));
}
  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Board</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="board p-2 flex-1"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4"
          onClick={addTask}
        >
        Add
        </button>
      </div>

      <TaskList tasks={tasks} />

    </main>
  );
}
