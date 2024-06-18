"use client";
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ShareLink } from "../ShareLink/ShareLink";
import { Task } from "@/Components/Task/Task";

export function ToDo({ todo, setTodo }) {
  // const [todo, setTodo] = useState([
  //   {
  //     id: Date.now(),
  //     title: "To-Do List",
  //     tasks: [],
  //     newTask: "",
  //     newDueDate: new Date().toISOString().split("T")[0],
  //   },
  // ]);

  // const addList = () => {
  //   setTodo((prevLists) => [
  //     ...prevLists,
  //     {
  //       id: Date.now(),
  //       title: "LIST",
  //       tasks: [],
  //       newTask: "",
  //       newDueDate: new Date().toISOString().split("T")[0],
  //     },
  //   ]);
  // };

  const deleteTodo = (a) => {
    setTodo((prevLists) => prevLists.filter((list) => list.id !== a));
  };

  const addTask = (Id) => {
    console.log(Id);
    setTodo((prevLists) =>
      prevLists.map((list) =>
        list.id === Id
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                {
                  id: Date.now(),
                  text: list.newTask,
                  completed: false,
                  dueDate: list.newDueDate,
                },
              ],
              newTask: "",
              newDueDate: new Date().toISOString().split("T")[0],
            }
          : list
      )
    );
  };

  const taskCompletedCheckBox = (Id, taskId) => {
    console.log(Id, taskId);
    setTodo((prevLists) =>
      prevLists.map((list) =>
        list.id === Id
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : list
      )
    );
  };

  const taskDelete = (listId, taskId) => {
    // console.log(listId);
    setTodo((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
          : list
      )
    );
  };

  const addnewtask = (listId, value) => {
    setTodo((prevLists) =>
      prevLists.map((list) =>
        list.id === listId ? { ...list, newTask: value } : list
      )
    );
  };

  const addDuedate = (listId, value) => {
    setTodo((prevLists) =>
      prevLists.map((list) =>
        list.id === listId ? { ...list, newDueDate: value } : list
      )
    );
  };

  const move = (listId, dragIndex, hoverIndex) => {
    const list = todo.find((list) => list.id === listId);
    console.log(list);
    const updatedTasks = [...list.tasks];
    console.log(updatedTasks);
    const [removedTask] = updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, removedTask);
    setTodo((prevLists) =>
      prevLists.map((list) =>
        list.id === listId ? { ...list, tasks: updatedTasks } : list
      )
    );
  };

  const edittask = (listId, taskId, newText, newDueDate) => {
    setTodo((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, text: newText, dueDate: newDueDate }
                  : task
              ),
            }
          : list
      )
    );
  };

  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");

  const editHeader = (listId) => {
    const listIndex = todo.findIndex((list) => list.id === listId);
    // console.log(listIndex);
    setEditIndex(listIndex);
    setEditText(todo[listIndex].title);
  };

  const cancelHeader = () => {
    setEditIndex(-1);
    setEditText("");
  };

  const saveHeader = () => {
    if (editText.trim() !== "") {
      const newLists = [...todo];
      newLists[editIndex].title = editText;
      setTodo(newLists);
      // console.log(todo)
      setEditIndex(-1);
      setEditText("");
    }
  };

  const handleEditInputChange = (e) => {
    setEditText(e.target.value);
  };

  const handleCopy = () => {
    const listString = todo
      .map((list) => {
        const tasksString = list.tasks
          .map(
            (task) =>
              `${task.text} (Due: ${task.dueDate}) - ${
                task.completed ? "Completed" : "Not Completed"
              }`
          )
          .join("\n");
        return `${list.title}:\n${tasksString}`;
      })
      .join("\n\n");

    navigator.clipboard
      .writeText(listString)
      .then(() => {
        console.log("Text copied toclipboard");
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed tocopy text:", err);
        alert("Failed to copy text. Please try again.");
      });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="bg-[#8d988d] w-[100vw] min-h-[100vh]  pt-[12vh] ">
        <div className="min-h-screen items-start px-[20px] grid grid-cols-3 justify-center w-[100vw]  gap-x-[6vw]">
          {todo.map((list) => (
            <div
              key={list.id}
              className="relative w-full bg-white bg-cover rounded-xl shadow-lg p-[20px] mb-[15px]  "
              style={{ backgroundImage: "url('/bg.jpg')" }}
            >
              <button
                onClick={() => deleteTodo(list.id)}
                className="absolute top-0 right-0 px-4 py-2  text-red-500 mb-4 transition-transform duration-300 transform hover:scale-105"
              >
                <img src="/cancel.png" alt="" className="w-[20px] h-[20px]" />
              </button>
              {editIndex === todo.findIndex((l) => l.id === list.id) ? (
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    value={editText}
                    onChange={handleEditInputChange}
                    className="flex-grow p-2 border rounded-2xl focus:outline-none w-[30%]"
                  />
                  <button
                    onClick={saveHeader}
                    className="text-green-500 px-4 py-2  ml-2  transition-transform duration-300 transform hover:scale-105"
                  >
                    <img
                      src="/tickk.png"
                      alt=""
                      className="w-[35px] h-[35px]"
                    />
                  </button>
                  <button
                    onClick={cancelHeader}
                    className="px-[15px]  text-red-600   font-bold text-[25px]  ml-2 transition-transform duration-300 transform hover:scale-105 "
                  >
                    x
                  </button>
                </div>
              ) : (
                <h1
                  className="text-[25px] font-bold mb-5 cursor-pointer flex justify-center"
                  onClick={() => editHeader(list.id)}
                >
                  {list.title}
                </h1>
              )}
              <div className="flex mb-4">
                <input
                  type="text"
                  value={list.newTask}
                  onChange={(e) => addnewtask(list.id, e.target.value)}
                  placeholder="Add a new task"
                  className="flex-grow w-[60%] p-2 border rounded-2xl focus:outline-none"
                />
                <input
                  type="date"
                  value={list.newDueDate}
                  onChange={(e) => addDuedate(list.id, e.target.value)}
                  className="p-2 border rounded-2xl focus:outline-none ml-2 text-gray-400 w-[25%]"
                />
                <button
                  onClick={() => addTask(list.id)}
                  className="text-blue-500 px-4 py-2  transition-transform duration-300 transform hover:scale-105"
                >
                  <img src="/add.png" alt="" className="w-[40px] h-[40px]" />
                </button>
              </div>
              <ul className="list-none space-y-2">
                {list.tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    move={(dragIndex, hoverIndex) =>
                      move(list.id, dragIndex, hoverIndex)
                    }
                    listId={list.id}
                    taskCompletedCheckBox={taskCompletedCheckBox}
                    taskDelete={taskDelete}
                    edittask={edittask}
                  />
                ))}
              </ul>
              <div className="flex justify-end items-center">
                <button
                  className="font-bold pt-4 px-4  text-blue-500  hover:scale-105 transition-transform duration-300"
                  onClick={handleCopy}
                >
                  <img src="/copy.png" alt="" className="w-[30px] h-[30px]" />
                </button>
                <ShareLink listId={list.id} />
              </div>{" "}
            </div>
          ))}
        </div>
        {/* <button
          onClick={addList}
          className="absolute top-20 right-20 px-4 py-2 rounded-lg text-black bg-[#ece6e3]  mb-4 hover:scale-110 duration-300"
        >
          <img src="/add.png" alt="" className="w-[45px] h-[45px]" />
        </button> */}
      </section>
    </DndProvider>
  );
}
