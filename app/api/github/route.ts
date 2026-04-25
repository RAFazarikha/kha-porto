import { NextResponse } from "next/server";

const GITHUB_QUERY = `
  query($username: String!) {
    user(login: $username) {
      name
      repositories(first: 100, ownerAffiliations: OWNER) {
        totalCount
        nodes {
          stargazerCount
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
      followers { totalCount }
      following { totalCount }
    }
  }
`;

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GITHUB_QUERY,
        variables: { username: "RAFazarikha" },
      }),
      next: { revalidate: 3600 },
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}