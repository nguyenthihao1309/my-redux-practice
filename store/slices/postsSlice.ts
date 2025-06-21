import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EPostState, Post, PostsState } from "../types";

//1. Initialize the initial value for the state
const initialState: PostsState = {
  posts: [],
  status: EPostState.idle, // ban đầu không làm gì cả
  error: null,
};

//2. Create async thunk to call the api
//createAsyncThunk makes handling asynchronous actions (like API calls) easy.
// It will automatically create actions: pending, fulfilled, rejected.
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("/api/posts");
  if (!response.ok) {
    throw new Error("Server responded with an error!");
  }
  const data: Post[] = await response.json();

  return data;
});

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postId: number) => {
    const response = await fetch(`/api/posts/${postId}/like`, {
      method: "PATCH",
    });

    if (!response.ok) {
      throw new Error("Failed to like the post");
    }

    const updatedPost: Post = await response.json();
    return updatedPost;
  }
);

//3. create slices
const postsSlice = createSlice({
  name: "posts", //name of slice
  initialState, // initial state
  reducers: {
    //Reducers for synchronous actions (we don't have them here)
  },

  // extraReducers handle actions created from outside the slice,
  // here are the actions from createAsyncThunk.
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        // When starting API call: change status to 'loading'

        state.status = EPostState.loading;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        //When API call is successful: status is 'succeeded' and save data to state
        state.status = EPostState.succeeded;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        // when api call fails: status is 'failed' and save error message
        state.status = EPostState.failed;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(likePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const updatedPost = action.payload;
        // Find the index of the post to update in the state.posts array
        const existingPostIndex = state.posts.findIndex(
          (post) => post.id === updatedPost.id
        );

        if (existingPostIndex !== -1) {
          // Replace old posts with new posts updated from the server
          state.posts[existingPostIndex] = updatedPost;
        }
      });
  },
});

//4. Export reducer

export default postsSlice.reducer;
