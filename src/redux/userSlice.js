import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  user: localStorage.getItem("post")
    ? JSON.parse(localStorage.getItem("post"))
    : [],
  details: {},
  comments: [],
  isLoading: false,
  error: "",
};

export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );
  return response.data;
});

export const fetchUserDetails = createAsyncThunk(
  "users/fetchUserDetails",
  async (id) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return response.data;
  }
);
export const fetchUserDetailsComments = createAsyncThunk(
  "users/fetchUserDetailsComments",
  async (id) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    return response.data;
  }
);

export const addNewUser = createAsyncThunk("users/addNewUser", async (body) => {
  const response = await axios.post(
    `https://jsonplaceholder.typicode.com/posts`,
    body
  );

  return response.data;
});

export const handleDelete = createAsyncThunk("users/deleteUser", async (id) => {
  console.log(id);
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return id;
});

export const userSlice = createSlice({
  name: `users`,
  initialState,
  reducers: {
    clear: () => (initialState.user = []),
    clearDetails: () => initialState.details,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      // localStorage.setItem("post", JSON.stringify(state.user));
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.details = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(fetchUserDetailsComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserDetailsComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUserDetailsComments.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(addNewUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      console.log(state.user);
      state.user = [...state.user, action.payload];
      toast.success("🚀 Add post successfully!");
      state.isLoading = false;
      localStorage.setItem("post", JSON.stringify(state.user));
    });
    builder.addCase(addNewUser.rejected, (state, action) => {
      state.error = action.error.message;
      toast.success(action.error.message);
      state.isLoading = false;
    });
    builder.addCase(handleDelete.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleDelete.fulfilled, (state, action) => {
      const deletePost = state.user.filter(
        (post) => post.id !== action.payload
      );
      state.user = deletePost;
      state.isLoading = false;
      console.log(state.user);
      toast.success("🗑️ Remove post successfully!");
      localStorage.setItem("post", JSON.stringify(state.user));
    });
    builder.addCase(handleDelete.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const { clear, clearDetails, clearDetailsComments } = userSlice.actions;
export default userSlice.reducer;
