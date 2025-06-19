import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";

// configureStore will automatically set up the Redux DevTools and default middleware
export const store = configureStore({
  reducer: {
    // This is where all your reducers are combined:
    // The key 'posts' will be used to access the state from the postsSlice:
    posts: postsReducer, // This name will be automatically output from postsSlice
  },
});

// Export important types for use throughout the application:

// RootState defines the type of all state in the store
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch defines the type of dispatch function
export type AppDispatch = typeof store.dispatch;
