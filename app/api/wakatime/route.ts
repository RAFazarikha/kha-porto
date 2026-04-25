import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API key missing' }, { status: 500 });

  const base64ApiKey = Buffer.from(apiKey).toString('base64');
  const headers = { Authorization: `Basic ${base64ApiKey}` };

  // Helper untuk format tanggal menjadi seperti "April 18, 2026"
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    }).format(date);
  };

  try {
    // Menarik data 7 hari terakhir dan data all-time secara paralel
    const [stats7DaysRes, statsAllTimeRes] = await Promise.all([
      fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', { headers, next: { revalidate: 60 } }),
      fetch('https://wakatime.com/api/v1/users/current/stats/all_time', { headers, next: { revalidate: 60 } })
    ]);

    if (!stats7DaysRes.ok || !statsAllTimeRes.ok) {
        throw new Error('Gagal fetch data dari WakaTime');
    }

    const stats7Days = await stats7DaysRes.json();
    const statsAllTime = await statsAllTimeRes.json();

    // Menyusun payload JSON agar persis dengan kebutuhan layout Card
    return NextResponse.json({
      overview: {
        startDate: formatDate(stats7Days.data.start),
        endDate: formatDate(stats7Days.data.end),
        dailyAverage: stats7Days.data.human_readable_daily_average || '0 mins',
        totalThisWeek: stats7Days.data.human_readable_total || '0 mins',
        bestDayDate: formatDate(stats7Days.data.best_day?.date),
        bestDayText: stats7Days.data.best_day?.text || '0 mins',
        allTimeTotal: statsAllTime.data.human_readable_total || '0 mins'
      },
      // Tetap pertahankan data languages untuk Bar Chart kamu
      languages: stats7Days.data.languages.map((l: any) => ({
        name: l.name, 
        text: l.text, 
        percent: l.percent
      })),
    });

  } catch (error) {
    console.error('Wakatime API Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}