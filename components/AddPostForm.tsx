"use client";

import { addNewPost } from "@/store/slices/postsSlice";
import { AppDispatch } from "@/store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // Use a state to manage the state of the button, avoid pressing multiple times
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch<AppDispatch>();

  // Check if it can be saved (both title and body must have content)
  const canSave = [title, body].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        // unwrap() will return the action's payload or throw an error if rejected
        await dispatch(addNewPost({ title, body })).unwrap();

        // If successful, reset the input cells
        setTitle("");
        setBody("");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Add a New Post</h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="postTitle"
            className="block text-gray-700 font-medium mb-2"
          >
            Post Title:
          </label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="postContent"
            className="block text-gray-700 font-medium mb-2"
          >
            Content:
          </label>
          <textarea
            id="postContent"
            name="postContent"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 h-24 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 disabled:bg-gray-400 transition-colors"
        >
          {addRequestStatus === "pending" ? "Saving..." : "Save Post"}
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
