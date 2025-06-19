"use client";

import { RootState } from "@/store/store";
import { EPostState } from "@/store/types";
import { useSelector } from "react-redux";

const Header = () => {
  // Use useSelector to get the right piece of data we need.
  const postsCount = useSelector(
    (state: RootState) => state.posts.posts.length
  );

  // We also get 'status' to only display the amount when the download is complete
  const postsStatus = useSelector((state: RootState) => state.posts.status);

  return (
    <header className="bg-zinc-800 text-white p-4 shadow-md">
     {/* 
        Only display this text when status is 'succeeded'.
        This Component Header does not need to know how the API is called, it only cares about the final data.
      */}
      {postsStatus === EPostState.succeeded && (
        <p>Total number of posts: {postsCount}</p>
      )}
    </header>
  );
};

export default Header;