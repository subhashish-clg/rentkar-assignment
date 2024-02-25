import { useDispatch, useSelector } from "react-redux";
import { addTodo, refreshTodos } from "../state/slices/TodoSlice";
import { useRef } from "react";
import { AppDispatch, RootState } from "../state/store";

export default function TodoInputForm() {
  const isLoading = useSelector((state:RootState) => state.todos.isLoading)
  const dispatch = useDispatch<AppDispatch>();

  const titleRef = useRef<HTMLInputElement>(null);

  const handleSumbit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (titleRef.current) {
      titleRef.current.disabled = true;
      await dispatch(
        addTodo({ title: titleRef.current.value, body: titleRef.current.value })
      );

      await dispatch(refreshTodos())


      titleRef.current.disabled = false;

      titleRef.current.value = "";
    }
  };

  return (
    <div>
      <form
        className={`flex justify-center items-center gap-3 ${isLoading && "opacity-50"}`}
        onSubmit={handleSumbit}
      >
        <input
          className="border-2 outline-gray-400 px-4 py-2 w-full rounded-lg"
          type="text"
          name="title"
          ref={titleRef}
          placeholder="Add a Todo"
          required
        />
        <button className="bg-green-400 p-2 rounded disabled:opacity-45 hover:bg-green-500">
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
      </form>
    </div>
  );
}
