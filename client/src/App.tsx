import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./state/store";
import TodoInputForm from "./components/TodoInputForm";
import Todo from "./components/Todo";
import { useEffect, useState } from "react";
import { deleteTodo, fetchAllTodos } from "./state/slices/TodoSlice";

export default function App() {
  const todosState = useSelector((state: RootState) => state.todos);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    console.log(todosState.todos.filter((todo) => todo.isDone));

    todosState.todos
      .filter((todo) => todo.isDone)
      .forEach(async (todo) => {
        await dispatch(deleteTodo(todo._id));
      });

    await dispatch(fetchAllTodos());
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
              className="bg-red-400 p-2 rounded disabled:opacity-45 aspect-square hover:bg-red-500"
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 space-y-2 flex-1 overflow-y-auto">
            {todosState.todos.length > 0 ? (
              todosState.todos.map((todo) => {
                if (
                  searchQuery &&
                  !todo.title
                    .toLowerCase()
                    .includes(searchQuery.trim().toLowerCase())
                ) {
                  return;
                }
                return <Todo key={todo._id} todo={todo} />;
              })
            ) : (
              <p>Add Todos to continue</p>
            )}
          </div>
          <TodoInputForm />
        </div>
      </main>
    </>
  );
}
