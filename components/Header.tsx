"use client";

import { RootState } from "@/store/store";
import { EPostState } from "@/store/types";
import { useSelector } from "react-redux";

const Header = () => {
  // Use useSelector to get the right piece of data we need.
  const {posts, status} = useSelector(
    (state: RootState) => state.posts
  );

  //sum of likes
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0)

  return (
    <header className="bg-zinc-800 text-white p-4 shadow-md">
     {/* 
        Only display this text when status is 'succeeded'.
        This Component Header does not need to know how the API is called, it only cares about the final data.
      */}
      {status === EPostState.succeeded && (
        <div className="text-lg space-x-6"> 
            <span>Total Posts: {posts.length}</span>
            <span>Total Likes: {totalLikes}</span>
          </div>
      )}
    </header>
  );
};

export default Header;