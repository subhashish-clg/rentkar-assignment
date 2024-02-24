import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./state/store";
import TodoInputForm from "./components/TodoInputForm";
import Todo from "./components/Todo";
import { useEffect, useState } from "react";
import { deleteTodo, fetchAllTodos } from "./state/slices/TodoSlicer";

export default function App() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    console.log(todos.filter((todo) => todo.isDone));

    todos
      .filter((todo) => todo.isDone)
      .map(async (todo) => {
        await dispatch(deleteTodo(todo._id));
      });

    await dispatch(fetchAllTodos())
  };

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, []);
  return (
    <>
      <main className="container mx-auto h-screen  flex justify-center items-start">
        <div className="m-auto  w-full h-full max-w-[28rem] max-h-[40rem] md:rounded-3xl md:shadow-2xl px-6 py-8 relative bg-gray-50 flex flex-col">
          <div>
            <h1 className="text-3xl font-extrabold text-purple-500">
              Todo App
            </h1>
          </div>
          <div className="flex mt-6 gap-4">
            <input
              className="border-2 outline-gray-400 px-4 py-2 w-full rounded-lg"
              type="text"
              name="title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search TODOs"
            />
            <button
              className="bg-green-400 p-2 rounded disabled:opacity-45 aspect-square"
              title="Delete Marked Todos"
              onClick={handleDelete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 space-y-2 flex-1 overflow-y-auto">
            {todos.map((todo) => {
              if (searchQuery && !todo.title.includes(searchQuery.trim())) {
                return;
              }
              return <Todo key={todo._id} todo={todo} />;
            })}
          </div>
          <TodoInputForm />
        </div>
      </main>
    </>
  );
}
