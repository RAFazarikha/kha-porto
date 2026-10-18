import { NextResponse } from "next/server";
import { getGithubStats } from "@/lib/github";

export async function GET() {
  try {
    return NextResponse.json(await getGithubStats());
  } catch (error) {
    console.error("GitHub API Error:", error);
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 502 });
  }
}
