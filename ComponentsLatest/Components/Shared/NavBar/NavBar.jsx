export function NavBar({ setTodo, todo }) {
  const addList = () => {
    setTodo((prevLists) => [
      ...prevLists,
      {
        id: Date.now(),
        title: "GOALS",
        tasks: [],
        newTask: "",
        newDueDate: new Date().toISOString().split("T")[0],
      },
    ]);
  };

  return (
    <section className=" w-[100vw] h-[80px] bg-white fixed z-50 top-0">
      <div className="w-full flex justify-between px-[2vw] items-center h-full">
        <h1 className="text-[36px] text-[#9aa0a3] font-[700]">ToDo List</h1>
        <div>
          <button
            onClick={addList}
            className="px-4 py-2 rounded-lg text-black bg-[#ece6e3]  hover:scale-110 duration-300"
          >
            <img src="/add.png" alt="" className="w-[45px] h-[45px]" />
          </button>
        </div>
      </div>
    </section>
  );
}
