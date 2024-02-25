import {
  ITodo,
  deleteTodo,
  refreshTodos,
  updateTodo,
} from "../state/slices/TodoSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { useRef, useState } from "react";

export default function Todo(props: { todo: ITodo }) {
  const todoTextRef = useRef<HTMLTextAreaElement>(null);
  const [todoTitle, setTodoTitle] = useState<string>(props.todo.title);
  const [checked, setChecked] = useState<boolean>(props.todo.isDone);

  const dispatch = useDispatch<AppDispatch>();
  const handleDone: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();

    setChecked((prev) => !prev);

    await Promise.all([
      dispatch(
        updateTodo({
          ...props.todo,
          isDone: !props.todo.isDone,
        })
      ),
      dispatch(refreshTodos()),
    ]);
  };

  const handleTodoUpdate: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (todoTextRef.current) {
      await dispatch(
        updateTodo({
          ...props.todo,
          title: todoTextRef.current.value,
        })
      );

      todoTextRef.current.blur();
    }
    await dispatch(refreshTodos());
  };
  return (
    <div
      className={`bg-white px-4 py-4 rounded-md hover:shadow-lg transition-all ease-linear flex justify-between items-center gap-2 `}
    >
      <form onSubmit={handleTodoUpdate} className="flex-1 group">
        <textarea
          className={` ${
            checked && "opacity-50 line-through"
          } border-0 w-full  h-fit`}
          wrap="hard"
          ref={todoTextRef}
          disabled={checked}
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        ></textarea>
        <div className="flex gap-4">
          <button
            disabled={checked}
            className=" bg-gray-500 group-focus-within:bg-green-500 text-white mt-4 px-4 py-1 rounded-full  disabled:bg-gray-500 transition-colors ease-linear"
          >
            Update
          </button>
          <button
            onClick={async () => {
              await dispatch(deleteTodo(props.todo._id));
              await dispatch(refreshTodos());
            }}
            className="bg-red-500 text-white mt-4 px-4 py-1 rounded-full disabled:bg-gray-100"
          >
            Delete
          </button>
        </div>
      </form>
      <div>
        <input
          type="checkbox"
          className="w-6 h-6 rounded-full"
          onChange={handleDone}
          checked={checked}
        />
      </div>
    </div>
  );
}
