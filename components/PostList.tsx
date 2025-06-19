"use client";

import { fetchPosts } from "@/store/slices/postsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PostList = () => {
  // 1. GET THE DISPATCH FUNCTION
  // useDispatch is the hook to send actions to the Redux store
  const dispatch = useDispatch<AppDispatch>();

  // 2. GET DATA FROM STORE
  // useSelector is the hook to "read" state from the Redux store
  const { posts, status, error } = useSelector(
    (state: RootState) => state.posts
  );

  // 3. CALL API WHEN COMPONENT IS FIRST LOADED
  useEffect(() => {
    // Only call API if state is 'idle'
    if (status === "idle") {
      dispatch(fetchPosts()); // Send the fetchPosts action to the store
    }
  }, [status, dispatch]);

  // 4. DISPLAY THE UI BASED ON STATE
  if (status === "loading") {
    return <p className="text-center mt-8 text-l">Loading...</p>;
  }

  if (status === "failed") {
    return (
      <p className="text-center mt-8 text-lg text-red-500">Error: {error}</p>
    );
  }

  return (
    <ul className="list-none p-0 space-y-4">
      {posts.map((post) => (
        <li
          key={post.id}
          className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm"
        >
          <h3 className="text-xl font-semibold mb-2 text-zinc-800">
            {post.title}
          </h3>
          <p className="text-zinc-600">{post.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
