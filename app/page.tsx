import AddPostForm from "@/components/AddPostForm";
import Header from "@/components/Header";
import PostList from "@/components/PostList";
import type { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header />

      <main className="container mx-auto p-4 md:p-8">
        <AddPostForm />

        <h1 className="text-3xl font-bold mb-6 text-zinc-800">All Posts</h1>
        <PostList />
      </main>
    </div>
  );
};

export default HomePage;
