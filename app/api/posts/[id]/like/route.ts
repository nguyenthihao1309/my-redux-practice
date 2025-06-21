import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Get the id from the URL and convert it to a number
  const postId = parseInt(params.id, 10);

  if (isNaN(postId)) {
    return new NextResponse("Invalid post ID", { status: 400 });
  }

  try {
    // Use prisma to find and update the number of Likes for posts
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          increment: 1, // Increase the 'likes' field by 1
        },
      },
    });

    // Returns updated posts
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Request error", error);
    return new NextResponse(`Error liking post with ID ${postId}`, {
      status: 500,
    });
  }
}
