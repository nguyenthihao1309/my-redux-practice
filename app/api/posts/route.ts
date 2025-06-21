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
