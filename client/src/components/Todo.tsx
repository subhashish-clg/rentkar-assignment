import { ITodo, fetchAllTodos, markTodo } from "../state/slices/TodoSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";

export default function Todo(props: { todo: ITodo }) {
  const dispatch = useDispatch<AppDispatch>();
  const handleDone: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();

    await dispatch(
      markTodo({ id: props.todo._id, status: !props.todo.isDone })
    );
    await dispatch(fetchAllTodos());
  };
  return (
    <div
      className={`bg-white px-4 py-4 rounded-md hover:shadow-lg transition-all ease-linear flex justify-between items-center gap-2 ${
        props.todo.isDone && "opacity-50 line-through"
      }`}
    >
      <h3>{props.todo.title}</h3>
      <div>
        <input
          type="checkbox"
          className="w-6 h-6 rounded-full"
          onChange={handleDone}
          checked={props.todo.isDone}
        />
      </div>
    </div>
  );
}
