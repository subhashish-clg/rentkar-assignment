import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export interface ITodo {
  _id: string;
  title: string;
  body: string;
  isDone: boolean;
  createdAt: string;
}

export interface TodoState {
  todos: ITodo[];
  initialized: boolean;
  isLoading: boolean;
  error?: string;
}

export const fetchAllTodos = createAsyncThunk("todos/fetchAll", async () => {
  const response = await axios.get<ITodo[]>(
    `${import.meta.env.VITE_SERVER_URL}/todos`,
    { timeout: 5000 }
  );

  return response.data;
});

export const refreshTodos = createAsyncThunk("todos/refresh", async () => {
  const response = await axios.get<ITodo[]>(
    `${import.meta.env.VITE_SERVER_URL}/todos`,
    { timeout: 5000 }
  );

  return response.data;
});

export const addTodo = createAsyncThunk(
  "todos/add",
  async (todo: Partial<ITodo>) => {
    console.log(import.meta.env.VITE_SERVER_URL);
    const response = await axios.post<{ status: string; message: string }>(
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
  initialized: false,
  isLoading: true,
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
          toast.dismiss();
          state.todos = [...action.payload];
          state.isLoading = false;

          toast("Successfully fetched all the todos from the database.");
        }
      )
      .addCase(fetchAllTodos.pending, (state) => {
        toast.dismiss();

        state.isLoading = true;

        toast("Fetching TODOs from the database please wait.");
      })
      .addCase(fetchAllTodos.rejected, (state) => {
        toast.dismiss();

        state.isLoading = false;
        state.error =
          "Failed fetching TODOs from the database please refresh the page.";

        toast.error(
          "Failed fetching TODOs from the database please refresh the page."
        );
      });

    builder
      .addCase(addTodo.fulfilled, (state) => {
        toast.dismiss();
        state.isLoading = false;
        state.error = undefined;
        toast.success("Successfully added TODO.");
      })
      .addCase(addTodo.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(addTodo.rejected, (state) => {
        toast.dismiss();
        state.isLoading = false;
        state.error = "Failed adding the TODO to the database.";

        toast.error("Failed adding the TODO to the database.");
      });

    builder
      .addCase(refreshTodos.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
        toast.dismiss()
        state.initialized = true
        state.isLoading = false;
        state.error = undefined;
        state.todos = [...action.payload]
        toast.success("Successfully synced TODOs.", {autoClose: 10});
      })
      .addCase(refreshTodos.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(refreshTodos.rejected, (state) => {
        toast.dismiss();
        state.isLoading = false;
        state.error = "Failed to sync.";

        toast.error("Failed to sync.");
      });

    builder.addCase(markTodo.fulfilled, () => {});

    builder.addCase(deleteTodo.fulfilled, () => {});
  },
});

// Action creators are generated for each case reducer function

export default todosSlice.reducer;
