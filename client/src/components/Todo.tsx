import { ITodo, markTodo, refreshTodos } from "../state/slices/TodoSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { useState } from "react";

export default function Todo(props: { todo: ITodo }) {
  const [checked, setChecked] = useState<boolean>(props.todo.isDone)
  const dispatch = useDispatch<AppDispatch>();
  const handleDone: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    setChecked(prev => !prev)

    await dispatch(
      markTodo({ id: props.todo._id, status: !props.todo.isDone })
    );
    await dispatch(refreshTodos());
  };
  return (
    <div
      className={`bg-white px-4 py-4 rounded-md hover:shadow-lg transition-all ease-linear flex justify-between items-center gap-2 ${
        checked && "opacity-50 line-through"
      }`}
      onClick={handleDone}
    >
      <h3>{props.todo.title}</h3>
      <div>
        <input
          type="checkbox"
          className="w-6 h-6 rounded-full"
          readOnly
          checked={checked}
        />
      </div>
    </div>
  );
}
