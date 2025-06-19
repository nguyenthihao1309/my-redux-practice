import Header from "@/components/Header";
import PostList from "@/components/PostList";
import type { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <div>
      <Header />

      {/* The main section contains the main content of the page */}
      <main style={{ padding: "2rem" }}>
        <h1>List of articles from API</h1>

        {/* Put Client Component here */}
        <PostList />
      </main>
    </div>
  );
};

export default HomePage;
