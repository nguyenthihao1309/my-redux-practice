import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    //Use prisma to get all posts, sorted by latest creation date
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Return data as JSON with status 200 (OK)
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Request error", error);
    // If there is an error, return error 500 (Internal Server Error)
    return new NextResponse("Error fetching posts", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Get title and body data from the request's body
    const { title, body } = await request.json();

    // Check simple input data
    if (!title || !body) {
      return new NextResponse("Title and body are required", { status: 400 });
    }

    // Use Prisma to create a new article in the database
    const newPost = await prisma.post.create({
      data: {
        title,
        body,
        // 'likes' will have a default value of 0 as defined in the schema
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Request error", error);
    return new NextResponse("Error creating post", { status: 500 });
  }
}
