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
                color
              }
            }
          }
        }
        followers {
          totalCount
        }
        following {
          totalCount
        }
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

interface Repository {
  stargazerCount: number;
}

interface GitProps {
  dict: Record<string, string>;
}

function ContributionGraph({ weeks, dict }: { weeks: Week[] } & GitProps) {
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
      <h3 className="text-slate-600 dark:text-slate-400 text-sm mb-3">{dict.history}</h3>
      
      {/* Container utama dengan horizontal scroll jika layar terlalu kecil */}
      <div className="p-1 flex flex-col gap-1 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 justify-between">

        <div className="flex gap-1 h-5 justify-between">
          {weeks.map((week, weekIndex) => {
            const firstDay = week.contributionDays[0]?.date;
            if (!firstDay) return <div key={weekIndex} className="w-3" />;

            // Konversi tanggal GitHub ('YYYY-MM-DD') ke nama bulan lokal (Jan, Feb, dst)
            const currentMonth = new Date(firstDay).toLocaleString('id-ID', { month: 'short' });
            let showMonth = false;

            // Tampilkan label bulan jika ini adalah minggu pertama, 
            // atau jika bulan ini berbeda dengan bulan pada minggu sebelumnya
            if (weekIndex === 0) {
              showMonth = true;
            } else {
              const prevFirstDay = weeks[weekIndex - 1].contributionDays[0]?.date;
              if (prevFirstDay) {
                const prevMonth = new Date(prevFirstDay).toLocaleString('id-ID', { month: 'short' });
                if (currentMonth !== prevMonth) {
                  showMonth = true;
                }
              }
            }

            return (
              <div key={weekIndex} className="w-3 relative">
                {showMonth && (
                  <span className="absolute bottom-0 left-0 text-[10px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {currentMonth}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Looping untuk setiap minggu (kolom) */}
        <div className="flex gap-1 justify-between">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              
              {week.contributionDays.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`w-3 h-3 rounded-sm transition-colors duration-200 hover:ring-1 hover:ring-black dark:hover:ring-white ${getTailwindColor(
                    day.contributionCount
                  )}`}
                  title={`${day.contributionCount} contributions on ${day.date}`}
                />
              ))}
              
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-end gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <span>Sedikit</span>
          <div className="flex gap-1">
            {/* Kotak-kotak keterangan yang mewakili setiap level warna */}
            <div className="w-3 h-3 rounded-sm bg-slate-300 dark:bg-slate-900" />
            <div className="w-3 h-3 rounded-sm bg-blue-300 dark:bg-blue-900" />
            <div className="w-3 h-3 rounded-sm bg-blue-500 dark:bg-blue-700" />
            <div className="w-3 h-3 rounded-sm bg-blue-700 dark:bg-blue-500" />
            <div className="w-3 h-3 rounded-sm bg-blue-900 dark:bg-blue-400" />
          </div>
          <span>Banyak</span>
        </div>
        
      </div>
    </div>
  );
}

export default async function GithubStats({ dict }: GitProps) {
  const data = await getGitHubData("RAFazarikha");
  const stats = data.data.user;
  const calendarWeeks = stats.contributionsCollection.contributionCalendar.weeks;

  const totalStars = stats.repositories.nodes.reduce(
    (acc: number, repo: Repository) => acc + repo.stargazerCount,
    0
  );

  return (
    <section id="github" className="py-20 bg-slate-100 dark:bg-slate-800/50 transition-colors text-slate-800 dark:text-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">{dict.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="md:col-span-3 p-6 text-slate-600 bg-slate-200 dark:text-slate-400 dark:bg-slate-800 rounded-lg hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-300 transform hover:-translate-y-1">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{dict.totalRepo}</p>
                    <p className="text-3xl text-blue-800 dark:text-blue-400">{stats.repositories.totalCount}</p>
                </div>
                <div className="md:col-span-3 p-6 text-slate-600 bg-slate-200 dark:text-slate-400 dark:bg-slate-800 rounded-lg hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-300 transform hover:-translate-y-1">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{dict.totalContrib}</p>
                    <p className="text-3xl text-blue-800 dark:text-blue-400">{stats.contributionsCollection.contributionCalendar.totalContributions}</p>
                </div>
                <div className="md:col-span-6 p-6 text-slate-600 bg-slate-200 dark:text-slate-400 dark:bg-slate-800 rounded-lg hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-300 transform hover:-translate-y-1">
                    <ContributionGraph weeks={calendarWeeks} dict={dict} />
                </div>
                <div className="md:col-span-2 p-6 text-slate-600 bg-slate-200 dark:text-slate-400 dark:bg-slate-800 rounded-lg hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-300 transform hover:-translate-y-1">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{dict.totalFollowing}</p>
                    <p className="text-3xl text-blue-800 dark:text-blue-400">{stats.following.totalCount}</p>
                </div>
                <div className="md:col-span-2 p-6 text-slate-600 bg-slate-200 dark:text-slate-400 dark:bg-slate-800 rounded-lg hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-300 transform hover:-translate-y-1">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{dict.totalFollowers}</p>
                    <p className="text-3xl text-blue-800 dark:text-blue-400">{stats.followers.totalCount}</p>
                </div>
                <div className="md:col-span-2 p-6 text-slate-600 bg-slate-200 dark:text-slate-400 dark:bg-slate-800 rounded-lg hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-300 transform hover:-translate-y-1">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{dict.totalStars}</p>
                    <p className="text-3xl text-blue-800 dark:text-blue-400">{totalStars}</p>
                </div>
            </div>
        </div>
    </section>
  );
}