import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./state/store";
import TodoInputForm from "./components/TodoInputForm";
import Todo from "./components/Todo";
import { useEffect, useState } from "react";
import {  refreshTodos } from "./state/slices/TodoSlice";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const todosState = useSelector((state: RootState) => state.todos);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const promise = dispatch(refreshTodos());

    return () => promise.abort();
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
          </div>
          <div className="mt-6 space-y-2 flex-1 overflow-y-auto">
            {todosState.isLoading && !todosState.initialized && "Loading"}
            {todosState.initialized && todosState.todos.length === 0 && (
              <p>Please add a TODO.</p>
            )}
            {todosState.todos.length > 0 &&
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
              })}
          </div>
          <TodoInputForm />
        </div>
      </main>
      <ToastContainer />
    </>
  );
}
