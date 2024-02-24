import { useDispatch } from "react-redux";
import { addTodo, fetchAllTodos } from "../state/slices/TodoSlicer";
import { useRef } from "react";
import { AppDispatch } from "../state/store";

export default function TodoInputForm() {
  const dispatch = useDispatch<AppDispatch>();

  const titleRef = useRef<HTMLInputElement>(null);

  const handleSumbit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (titleRef.current) {
      titleRef.current.disabled = true;
      await dispatch(
        addTodo({ title: titleRef.current.value, body: titleRef.current.value })
      );

      await dispatch(fetchAllTodos())


      titleRef.current.disabled = false;

      titleRef.current.value = "";
    }
  };

  return (
    <div>
      <form
        className="flex justify-center items-center gap-3"
        onSubmit={handleSumbit}
      >
        <input
          className="border-2 outline-gray-400 px-4 py-2 w-full rounded-lg"
          type="text"
          name="title"
          ref={titleRef}
          placeholder="Add a Todo"
        />
        <button className="bg-green-400 p-2 rounded disabled:opacity-45">
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
