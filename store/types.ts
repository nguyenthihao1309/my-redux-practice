//1. define data type
//Post
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  likes: number;
}

type PostState = "idle" | "loading" | "succeeded" | "failed";

export enum EPostState {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}
//define the style for this slice's state
export interface PostsState {
  posts: Post[];
  status: PostState; // Status of the API call
  error: string | null;
}
