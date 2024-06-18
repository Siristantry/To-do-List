import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  TASK: "task",
};
export function Task({
  task,
  index,
  move,
  listId,
  taskCompletedCheckBox,
  taskDelete,
  edittask,
}) {
  // console.log(
  //   task,
  //   index,
  //   move,
  //   listId,
  //   taskCompletedCheckBox,
  //   taskDelete,
  //   edittask
  // );
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      move(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { type: ItemTypes.TASK, id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleSave = () => {
    edittask(listId, task.id, editedText, editedDueDate);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(task.text);
    console.log(editedDueDate);
    setEditedDueDate(task.dueDate);
  };

  return (
    <li
      ref={ref}
      className="flex items-center"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="flex-grow p-2 border rounded-2xl focus:outline-none mr-2 w-[40%]"
          />
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            className="p-2 border rounded-2xl focus:outline-none mr-2 "
          />
          <button
            onClick={handleSave}
            className="text-green-500 px-4 py-2  ml-2 "
          >
            <img src="/tickk.png" alt="" className="w-[35px] h-[35px]" />
          </button>
          <button
            onClick={handleCancel}
            className="text-red-600 px-3 py-1  ml-2 font-bold text-[20px] w-[10%]"
          >
            X
          </button>
        </>
      ) : (
        <div className="w-full flex items-center transition-all duration-300 hover:bg-[#cebfb6] rounded-[20px] px-[10px]">
          {" "}
          <img src="/drag.png" alt="" className="w-[20px] h-[20px] " />
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => taskCompletedCheckBox(listId, task.id)}
            className="mr-2 ml-2"
          />
          <span
            className={`flex-grow text-lg w-[60%] break-words  ${
              task.completed ? "line-through pointer-events-none" : ""
            }`}
            onDoubleClick={() => setIsEditing(true)}
            title="Double tap to edit" // Add tooltip here
          >
            {task.text} (Due: {task.dueDate})
          </span>
          <img src="/edit.png" alt="" className="w-[20px] h-[20px]" />
          <button
            onClick={() => taskDelete(listId, task.id)}
            className="text-red-600 px-3 py-1  ml-2 font-bold text-[20px]"
          >
            X
          </button>
        </div>
      )}
    </li>
  );
}
