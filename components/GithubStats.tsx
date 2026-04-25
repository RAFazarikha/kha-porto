import { Card } from "@/components/ui/card";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface Week {
  contributionDays: ContributionDay[];
}

// interface Repository {
//   stargazerCount: number;
// }

interface GitProps {
  dict: Record<string, string>;
}

// Komponen ContributionGraph tetap sama
function ContributionGraph({ weeks, dict }: { weeks: Week[] } & GitProps) {
  const getTailwindColor = (count: number) => {
    if (count === 0) return "bg-primary/20"; 
    if (count > 0 && count <= 3) return "bg-primary/40"; 
    if (count > 3 && count <= 6) return "bg-primary/60"; 
    if (count > 6 && count <= 10) return "bg-primary/80"; 
    return "bg-primary/100"; 
  };

  return (
    <div className="">
      <h3 className="text-sm mb-3">{dict.history}</h3>
      
      <div className="p-1 flex flex-col gap-1 overflow-x-auto scrollbar-thin justify-between">
        <div className="flex gap-1 h-5 justify-between">
          {weeks.map((week, weekIndex) => {
            const firstDay = week.contributionDays[0]?.date;
            if (!firstDay) return <div key={weekIndex} className="w-3" />;

            const currentMonth = new Date(firstDay).toLocaleString('id-ID', { month: 'short' });
            let showMonth = false;

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
              <div key={weekIndex} className="w-3 shrink-0 relative">
                {showMonth && (
                  <span className="absolute bottom-0 left-0 text-[10px] whitespace-nowrap">
                    {currentMonth}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="flex gap-1 justify-between">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1 shrink-0">
              {week.contributionDays.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`w-3 h-3 rounded-sm transition-colors duration-200 hover:ring-1 hover:ring-foreground ${getTailwindColor(
                    day.contributionCount
                  )}`}
                  title={`${day.contributionCount} contributions on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-end gap-2 text-[11px]">
          <span>Sedikit</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-primary/20" />
            <div className="w-3 h-3 rounded-sm bg-primary/40" />
            <div className="w-3 h-3 rounded-sm bg-primary/60" />
            <div className="w-3 h-3 rounded-sm bg-primary/80" />
            <div className="w-3 h-3 rounded-sm bg-primary" />
          </div>
          <span>Banyak</span>
        </div>
      </div>
    </div>
  );
}

// Fungsi fetch ke API route Next.js kita sendiri
async function getGithubStats() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  
  // Sesuaikan path ini jika file API route kamu bukan di app/api/github/route.ts
  const res = await fetch(`${baseUrl}/api/github`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub data from API route");
  }

  return res.json();
}

export default async function GithubStats({ dict }: GitProps) {
  const data = await getGithubStats();
  
  // Guard clause untuk mencegah error jika data gagal dimuat atau limit API habis
  if (!data || data.error || !data.data || !data.data.user) {
    return <div className="text-sm text-destructive">Gagal memuat data GitHub.</div>;
  }

  const stats = data.data.user;
  const calendarWeeks = stats.contributionsCollection.contributionCalendar.weeks;

  const totalStars = stats.repositories.nodes.reduce(
    (acc: number, repo: { stargazerCount: number }) => acc + repo.stargazerCount,
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      <Card size="sm" className="md:col-span-2 p-6 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border gap-0!">
          <p className="text-sm">{dict.totalFollowing}</p>
          <p className="text-3xl text-primary font-bold">{stats.following.totalCount}</p>
      </Card>
      <Card size="sm" className="md:col-span-2 p-6 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border gap-0!">
          <p className="text-sm">{dict.totalFollowers}</p>
          <p className="text-3xl text-primary font-bold">{stats.followers.totalCount}</p>
      </Card>
      <Card size="sm" className="md:col-span-2 p-6 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border gap-0!">
          <p className="text-sm">{dict.totalStars}</p>
          <p className="text-3xl text-primary font-bold">{totalStars}</p>
      </Card>
      <Card size="sm" className="md:col-span-3 p-6 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border gap-0!">
          <p className="text-sm">{dict.totalRepo}</p>
          <p className="text-3xl text-primary font-bold">{stats.repositories.totalCount}</p>
      </Card>
      <Card size="sm" className="md:col-span-3 p-6 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border gap-0!">
          <p className="text-sm">{dict.totalContrib}</p>
          <p className="text-3xl text-primary font-bold">{stats.contributionsCollection.contributionCalendar.totalContributions}</p>
      </Card>
      <Card size="sm" className="md:col-span-6 p-6 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border gap-0!">
        <ContributionGraph weeks={calendarWeeks} dict={dict} />
      </Card>
    </div>
  );
}