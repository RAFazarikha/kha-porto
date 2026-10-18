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

// Dipakai langsung oleh route handler dan server component (tanpa self-HTTP call).
export async function getGithubStats() {
  const token = process.env.GITHUB_ACCESS_TOKEN;
  if (!token) throw new Error("GITHUB_ACCESS_TOKEN missing");

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GITHUB_QUERY,
      variables: { username: "RAFazarikha" },
    }),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);

  return res.json();
}
