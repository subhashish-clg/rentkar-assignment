import { ITodo, refreshTodos, updateTodo } from "../state/slices/TodoSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { useRef, useState } from "react";

export default function Todo(props: { todo: ITodo }) {
  const todoTextRef = useRef<HTMLInputElement>(null)
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

    await Promise.all( [updateTodo(
      {
        ...props.todo,
        title: todoTextRef.current ? todoTextRef.current.value : props.todo.title
      }
    ), dispatch(refreshTodos())])
  };
  return (
    <div
      className={`bg-white px-4 py-4 rounded-md hover:shadow-lg transition-all ease-linear flex justify-between items-center gap-8 `}
    >
      <form onSubmit={handleTodoUpdate}>
        <input
          type="text"
          className={` ${checked && "opacity-50 line-through"} `}
          ref={todoTextRef}
          disabled={checked}
          // className="outline-none border-0 flex-1"
          defaultValue={props.todo.title}
        />
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
