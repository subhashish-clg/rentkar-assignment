import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface ITodo {
  _id: string;
  title: string;
  body: string;
  isDone: boolean;
  createdAt: string;
}

export interface TodoState {
  todos: ITodo[];
  isLoading: boolean;
  error?: string;
}

export const fetchAllTodos = createAsyncThunk("todos/fetchAll", async () => {
  const response = await axios.get<ITodo[]>(
    `${import.meta.env.VITE_SERVER_URL}/todos`
  );

  return response.data;
});

export const addTodo = createAsyncThunk(
  "todos/add",
  async (todo: Partial<ITodo>) => {
    console.log(import.meta.env.VITE_SERVER_URL);
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/todos`,
      todo
    );

    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/delete",
  async (id: string) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/todos/${id}`
    );

    return response.data;
  }
);

export const markTodo = createAsyncThunk(
  "todos/mark",
  async ({ id, status }: { id: string; status: boolean }) => {
    console.log(status);
    const response = await axios.patch(
      `${import.meta.env.VITE_SERVER_URL}/todos/${id}`,
      {
        status: status,
      }
    );

    return response.data;
  }
);

const initialState: TodoState = {
  todos: [] as ITodo[],
  isLoading: false,
  error: undefined,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    markTodo: (state, action: PayloadAction<string>) => {
      const indexToBeUpdated = state.todos.findIndex(
        (todo) => todo._id === action.payload
      );

      state.todos[indexToBeUpdated].isDone =
        !state.todos[indexToBeUpdated].isDone;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAllTodos.fulfilled,
        (state, action: PayloadAction<ITodo[]>) => {
          state.todos = [...action.payload];
          state.isLoading = false;
        }
      )
      .addCase(fetchAllTodos.pending, (state) => {
        state.isLoading = true;
      });

    builder.addCase(addTodo.fulfilled, () => {});

    builder.addCase(markTodo.fulfilled, () => {});

    builder.addCase(deleteTodo.fulfilled, () => {});
  },
});

// Action creators are generated for each case reducer function

export default todosSlice.reducer;
