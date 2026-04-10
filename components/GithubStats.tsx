const GITHUB_QUERY = `
    query($username: String!) {
    user(login: $username) {
        name
        repositories(first: 100, ownerAffiliations: OWNER) {
        totalCount
        }
        contributionsCollection {
        contributionCalendar {
            totalContributions
            weeks {
            contributionDays {
                contributionCount
                date
                color
            }
            }
        }
        }
        # Anda bisa menambah data lain seperti followers atau gists di sini
    }
    }
`;

async function getGitHubData(username: string) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GITHUB_QUERY,
      variables: { username },
    }),
    next: { revalidate: 3600 }, // Update data setiap jam
  });

  return res.json();
}

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface Week {
  contributionDays: ContributionDay[];
}

function ContributionGraph({ weeks }: { weeks: Week[] }) {
  // Fungsi untuk menentukan level warna Tailwind berdasarkan jumlah kontribusi
  const getTailwindColor = (count: number) => {
    if (count === 0) return "bg-slate-300 dark:bg-slate-900"; 
    if (count > 0 && count <= 3) return "bg-blue-300 dark:bg-blue-900"; 
    if (count > 3 && count <= 6) return "bg-blue-500 dark:bg-blue-700"; 
    if (count > 6 && count <= 10) return "bg-blue-700 dark:bg-blue-500"; 
    return "bg-blue-900 dark:bg-blue-400"; 
  };

  return (
    <div className="">
      <h3 className="text-sm text-slate-400 mb-3 font-semibold">Riwayat Kontribusi (1 Tahun Terakhir)</h3>
      
      {/* Container utama dengan horizontal scroll jika layar terlalu kecil */}
      <div className="flex gap-1 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 justify-between">
        
        {/* Looping untuk setiap minggu (kolom) */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            
            {/* Looping untuk setiap hari dalam minggu tersebut (baris) */}
            {week.contributionDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-3 h-3 rounded-sm transition-colors duration-200 hover:ring-1 hover:ring-black dark:hover:ring-white ${getTailwindColor(
                  day.contributionCount
                )}`}
                // Tooltip bawaan HTML saat kotak di-hover
                title={`${day.contributionCount} contributions on ${day.date}`}
              />
            ))}
            
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default async function GithubStats() {
  const data = await getGitHubData("RAFazarikha");
  const stats = data.data.user;
  const calendarWeeks = stats.contributionsCollection.contributionCalendar.weeks;

  return (
    <section id="github" className="py-20 bg-slate-100 dark:bg-slate-800/50 transition-colors text-slate-800 dark:text-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Statistik GitHub</h2>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="md:col-span-3 p-6 text-slate-600 bg-slate-200 dark:text-slate-400 dark:bg-slate-800 rounded-lg hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-300 transform hover:-translate-y-1">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Total Repositori</p>
                    <p className="text-3xl text-blue-800 dark:text-blue-400">{stats.repositories.totalCount}</p>
                </div>
                <div className="md:col-span-3 p-6 text-slate-600 bg-slate-200 dark:text-slate-400 dark:bg-slate-800 rounded-lg hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-300 transform hover:-translate-y-1">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Total Kontribusi</p>
                    <p className="text-3xl text-blue-800 dark:text-blue-400">{stats.contributionsCollection.contributionCalendar.totalContributions}</p>
                </div>
                <div className="md:col-span-6 p-6 text-slate-600 bg-slate-200 dark:text-slate-400 dark:bg-slate-800 rounded-lg hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-300 transform hover:-translate-y-1">
                    <ContributionGraph weeks={calendarWeeks} />
                </div>
            </div>
        </div>
    </section>
  );
}